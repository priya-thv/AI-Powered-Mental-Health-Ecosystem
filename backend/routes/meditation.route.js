// // routes/sounds.routes.js
// import express from 'express';
// import axios from 'axios';
// import dotenv from 'dotenv';

// dotenv.config();

// const router = express.Router();

// router.get('/search-sounds', async (req, res) => {
//   const query = req.query.query;

//   if (!query) {
//     return res.status(400).json({ error: 'Query is required' });
//   }

//   try {
//     const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
//       params: {
//         part: 'snippet',
//         q: query,
//         type: 'video',
//         maxResults: 5,
//         key: process.env.YOUTUBE_API_KEY,
//       },
//     });

//     const videos = response.data.items.map(item => ({
//       title: item.snippet.title,
//       videoId: item.id.videoId,
//       thumbnail: item.snippet.thumbnails.medium.url,
//     }));

//     res.json({ videos });
//   } catch (error) {
//     console.error('YouTube API error:', error.response?.data || error.message);
//     res.status(500).json({ error: 'Failed to fetch YouTube videos' });
//   }
// });

// export default router;


// routes/meditation.routes.js
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// Basic keyword mapping
const suggestions = {
  meditation: ['guided meditation', 'mindfulness meditation', 'relaxing meditation'],
  breathing: ['breathing exercise', 'deep breathing', 'box breathing', 'calm breathwork']
};

function detectCategory(userInput) {
  const input = userInput.toLowerCase();

  if (input.includes('breathe') || input.includes('breathing') || input.includes('inhale')) {
    return 'breathing';
  }

  if (input.includes('meditate') || input.includes('meditation') || input.includes('calm')) {
    return 'meditation';
  }

  // Default fallback
  return 'meditation';
}

router.get('/search-meditation', async (req, res) => {
  const userQuery = req.query.query;

  if (!userQuery) {
    return res.status(400).json({ error: 'Query is required' });
  }

  const category = detectCategory(userQuery);
  const searchTerms = suggestions[category];
  const queryToSearch = `${userQuery} ${searchTerms[Math.floor(Math.random() * searchTerms.length)]}`;

  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: queryToSearch,
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
