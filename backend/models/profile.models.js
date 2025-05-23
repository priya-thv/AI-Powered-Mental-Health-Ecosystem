// backend/models/profile.models.js

import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: '',
  },
  mood: {
    type: String,
    enum: ['happy', 'sad', 'neutral', 'angry', 'anxious'],
    default: 'neutral',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
