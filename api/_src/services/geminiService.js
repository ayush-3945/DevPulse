const { GoogleGenerativeAI } = require('@google/generative-ai');
const githubService = require('./githubService');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const generatePersonalityReport = async (username) => {
  if (!process.env.GEMINI_API_KEY) {
    throw { statusCode: 500, message: 'GEMINI_API_KEY is not configured.' };
  }

  try {
    // 1. Gather Context
    const profile = await githubService.getUserProfile(username);
    const repos = await githubService.getUserRepos(username);
    const topRepos = repos.filter(r => !r.fork).sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 5);
    
    const contextData = {
      name: profile.name || profile.login,
      bio: profile.bio,
      followers: profile.followers,
      publicRepos: profile.public_repos,
      createdAt: profile.created_at,
      topRepos: topRepos.map(r => ({ name: r.name, description: r.description, language: r.language, stars: r.stargazers_count }))
    };

    // 2. Build the Prompt (RTCF Framework)
    const prompt = `
[System Instruction]: You are a senior developer relations expert and psychologist. Analyze the developer's GitHub activity and generate a fun, insightful "Developer Personality" report.

[Context]:
Developer Data: ${JSON.stringify(contextData)}

[Task]:
1. Determine a creative "Developer Archetype" (e.g., "The Open Source Champion 🏆", "The Stealth Ninja 🥷").
2. Evaluate 4 traits on a scale of 1-10: 'Code Quality Focus', 'Community Engagement', 'Experimentation', 'Consistency'.
3. Write 2 key strengths and 2 fun facts based on their data.

[Format]: Return strictly a JSON object with this structure (no markdown formatting, just raw JSON):
{
  "archetype": "string (with emoji)",
  "traits": {
    "quality": number,
    "community": number,
    "experimentation": number,
    "consistency": number
  },
  "strengths": ["string", "string"],
  "funFacts": ["string", "string"],
  "summary": "string (2-3 sentences)"
}
`;

    // 3. Call Gemini API
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Use flash for speed
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Clean up potential markdown formatting from JSON output
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(text);

  } catch (error) {
    console.error('Gemini API Error:', error);
    throw { statusCode: 500, message: 'Failed to generate AI report.' };
  }
};

module.exports = {
  generatePersonalityReport
};
