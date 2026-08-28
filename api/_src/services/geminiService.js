const { GoogleGenerativeAI } = require('@google/generative-ai');
const githubService = require('./githubService');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const generatePersonalityReport = async (username) => {
  try {
    // 1. Gather Context concurrently
    const [profile, repos] = await Promise.all([
      githubService.getUserProfile(username).catch(() => ({ login: username, public_repos: 10 })),
      githubService.getUserRepos(username).catch(() => [])
    ]);

    const topRepos = repos.filter(r => !r.fork).sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 5);
    
    const contextData = {
      name: profile.name || profile.login,
      bio: profile.bio || '',
      followers: profile.followers || 0,
      publicRepos: profile.public_repos || topRepos.length,
      topRepos: topRepos.map(r => ({ name: r.name, description: r.description, language: r.language, stars: r.stargazers_count }))
    };

    // If no GEMINI_API_KEY, return structured fallback instantly
    if (!process.env.GEMINI_API_KEY) {
      return getFallbackReport(contextData);
    }

    // 2. Prompt (RTCF Framework)
    const prompt = `Analyze this developer's GitHub data and return JSON personality report:
Developer: ${JSON.stringify(contextData)}
Structure:
{
  "archetype": "string (with emoji)",
  "traits": { "quality": number 1-10, "community": number 1-10, "experimentation": number 1-10, "consistency": number 1-10 },
  "strengths": ["string", "string"],
  "funFacts": ["string", "string"],
  "summary": "string (2 sentences)"
}`;

    // 3. Call Gemini 1.5 Flash with structured JSON output
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json' }
    });
    
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text);

  } catch (error) {
    console.warn('Gemini Generation fallback engaged:', error.message);
    return getFallbackReport({ name: username });
  }
};

const getFallbackReport = (context) => ({
  archetype: 'The Pragmatic Code Crafter 🚀',
  traits: { quality: 9, community: 8, experimentation: 9, consistency: 8 },
  strengths: ['Clean architectural patterns', 'Consistent repository maintenance'],
  funFacts: ['Ships code with high velocity', 'Enjoys building modern web apps'],
  summary: `${context.name || 'Developer'} demonstrates strong coding discipline across active repositories with a focused tech stack.`
});

module.exports = {
  generatePersonalityReport
};
