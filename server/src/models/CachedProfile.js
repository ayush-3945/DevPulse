const mongoose = require('mongoose');

const CachedProfileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  profileData: {
    type: Object,
  },
  repoData: {
    type: Array,
  },
  languageData: {
    type: Object,
  },
  personalityReport: {
    type: Object,
  },
  analyzedAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    // TTL of 24 hours (1 day)
    default: () => new Date(+new Date() + 24 * 60 * 60 * 1000)
  }
}, {
  timestamps: true
});

// Create a TTL index so MongoDB automatically deletes expired documents
CachedProfileSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('CachedProfile', CachedProfileSchema);
