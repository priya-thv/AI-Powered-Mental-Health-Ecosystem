// // backend/musicGenerator.js
// import fetch from "node-fetch";

// const MUBERT_API_KEY = "YOUR_MUBERT_API_KEY"; // Replace with actual key

// const moodMap = {
//   anxious: "calm",
//   tired: "dreamy",
//   sad: "hopeful",
//   happy: "uplifting",
//   angry: "focus",
//   peaceful: "healing"
// };

// export async function generateMusic(emotion) {
//   const tag = moodMap[emotion.toLowerCase()] || "relax";

//   try {
//     const response = await fetch("https://api.mubert.com/v2/AI/music", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${MUBERT_API_KEY}`
//       },
//       body: JSON.stringify({
//         mood: tag,
//         duration: 120
//       })
//     });

//     const result = await response.json();
//     if (result && result.music_url) {
//       return { url: result.music_url };
//     } else {
//       return { error: "No music URL returned from Mubert API." };
//     }
//   } catch (err) {
//     console.error("Error generating music:", err);
//     return { error: "Failed to generate music." };
//   }
// }

// export default router;


// backend/musicGenerator.js (ES Module Version)
import { Router } from "express";
import fetch from "node-fetch";

const MUBERT_API_KEY = "YOUR_MUBERT_API_KEY"; // Replace with actual key

const moodMap = {
  anxious: "calm",
  tired: "dreamy",
  sad: "hopeful",
  happy: "uplifting",
  angry: "focus",
  peaceful: "healing"
};

export async function generateMusic(emotion) {
  const tag = moodMap[emotion.toLowerCase()] || "relax";

  try {
    const response = await fetch("https://api.mubert.com/v2/AI/music", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${MUBERT_API_KEY}`
      },
      body: JSON.stringify({
        mood: tag,
        duration: 120
      })
    });

    const result = await response.json();
    if (result && result.music_url) {
      return { url: result.music_url };
    } else {
      return { error: "No music URL returned from Mubert API." };
    }
  } catch (err) {
    console.error("Error generating music:", err);
    return { error: "Failed to generate music." };
  }
}

export default Router;