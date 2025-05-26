// routes/sounds.routes.js
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// Emotion to YouTube keyword mapping
const emotionToQuery = {
  anxious: "calming meditation music",
  tired: "deep sleep music",
  sad: "soothing piano music",
  happy: "uplifting meditation music",
  angry: "relaxing instrumental music",
  peaceful: "nature sounds meditation",
  hopeful: "healing music"
};

router.get('/youtube-music', async (req, res) => {
  const emotion = req.query.emotion?.toLowerCase();

  const searchQuery = emotionToQuery[emotion] || `${emotion} healing music`;

  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: searchQuery,
        type: 'video',
        maxResults: 5,
        key: process.env.YOUTUBE_API_KEY,
      },
    });

    const videos = response.data.items.map(item => ({
      title: item.snippet.title,
      videoId: item.id.videoId,
      thumbnail: item.snippet.thumbnails.medium.url,
    }));

    res.json({ videos });
  } catch (error) {
    console.error('YouTube API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch YouTube videos' });
  }
});

export default router;
