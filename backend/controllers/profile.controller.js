// controllers/profile.controller.js
import Profile from '../models/profile.models.js';

export const getProfile = async (req, res) => {
    const email = req.query.email;
    console.log('Fetching profile for:', email);  // Add this
  
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
  
    try {
      const profile = await Profile.findOne({ email });
      console.log('Found profile:', profile);  // Add this
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
  
      res.status(200).json(profile);
    } catch (err) {
      console.error('Error fetching profile:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  
  

export const setProfile = async (req, res) => {
  const { email, name, bio, mood } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    const updated = await Profile.findOneAndUpdate(
      { email },
      { name, bio, mood },
      { new: true, upsert: true }
    );

    res.json(updated);
    console.log('Updating profile for:', email);
console.log('New data:', { name, bio, mood });

  } catch (err) {
    console.error('Save profile error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
