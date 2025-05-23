

// import express from 'express';
// import auth from '../middleware/auth.js';
// import axios from 'axios';

// const VOICEFLOW_API_KEY = process.env.VOICEFLOW_API_KEY; // Use the Primary Key from Voiceflow
// const VOICEFLOW_PROJECT_ID = process.env.VOICEFLOW_PROJECT_ID;

// const router = express.Router();

// router.post('/', auth, async (req, res) => {
//   const { message } = req.body;
//   const userId = req.user.id; // from your auth middleware

//   if (!message) {
//     return res.status(400).json({ error: "Message is required." });
//   }

//   try {
//     const vfResponse = await axios.post(
//       `https://general-runtime.voiceflow.com/state/${VOICEFLOW_PROJECT_ID}/user/${userId}/interact`,
//       { action: { type: 'text', payload: message } },
//       {
//         headers: {
//           Authorization: `Bearer ${VOICEFLOW_API_KEY}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     const blocks = vfResponse.data;
//     const responses = blocks
//       .filter(b => b.type === 'text')
//       .map(b => b.payload.message);

//     const finalReply = responses.join(' '); // Combine all messages

//     res.json({ response: finalReply || "Oops, I didn’t get that 💭" });
//   } catch (err) {
//     console.error("Voiceflow error:", err.message, err.response?.data);
//     res.status(500).json({ error: "Failed to get response from CutieBot 💔" });
//   }
// });

// export default router;

// import express from 'express';
// import auth from '../middleware/auth.js';
// import axios from 'axios';

// // const VOICEFLOW_API_KEY = process.env.VOICEFLOW_API_KEY;
// // const VOICEFLOW_PROJECT_ID = process.env.VOICEFLOW_PROJECT_ID;
// const VOICEFLOW_API_KEY = "VF.DM.68132f6d0d6a45d0871f6b11.2UK96iKTIIeCNYnQ";
// const VOICEFLOW_PROJECT_ID = "67f95a5e62f6849a97c6b693";


// console.log("VOICEFLOW_PROJECT_ID:", VOICEFLOW_PROJECT_ID);
// console.log("VOICEFLOW_API_KEY:", VOICEFLOW_API_KEY ? "✅ Loaded" : "❌ Not Loaded");


// const router = express.Router();

// router.post('/', auth, async (req, res) => {
//   const { message } = req.body;
//   const userId = req.user?.id;

//   // Safety: Check for required data
//   if (!message) {
//     return res.status(400).json({ error: "Message is required." });
//   }

//   if (!VOICEFLOW_API_KEY || !VOICEFLOW_PROJECT_ID) {
//     console.error("❌ Missing Voiceflow credentials in environment variables.");
//     return res.status(500).json({ error: "Server configuration error (missing Voiceflow credentials)." });
//   }

//   try {
//     const voiceflowURL = `https://general-runtime.voiceflow.com/state/${VOICEFLOW_PROJECT_ID}/user/${userId}/interact`;

//     console.log("🔁 Sending message to Voiceflow:", message);
//     console.log("🔐 Using Project ID:", VOICEFLOW_PROJECT_ID);
//     console.log("🧠 User ID:", userId);

//     const vfResponse = await axios.post(
//       voiceflowURL,
//       { action: { type: 'text', payload: message } },
//       {
//         headers: {
//           Authorization: `Bearer ${VOICEFLOW_API_KEY}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     const blocks = vfResponse.data;
//     console.log("✅ Voiceflow raw response:", blocks);

//     const responses = blocks
//       .filter(b => b.type === 'text')
//       .map(b => b.payload.message);

//     const finalReply = responses.join(' ') || "Oops, I didn’t get that 💭";

//     res.json({ response: finalReply });

//   } catch (err) {
//     console.error("❌ Voiceflow error:", err.message);
//     console.error("🔍 Full response:", err.response?.data || "No extra data");

//     res.status(500).json({ error: "Failed to get response from CutieBot 💔" });
//   }
// });

// export default router;
import express from 'express';
import auth from '../middleware/auth.js';
import axios from 'axios';

const VOICEFLOW_API_KEY = "VF.DM.68132f6d0d6a45d0871f6b11.2UK96iKTIIeCNYnQ";
const VOICEFLOW_PROJECT_ID = "67f95a5e62f6849a97c6b693";

console.log("VOICEFLOW_PROJECT_ID:", VOICEFLOW_PROJECT_ID);
console.log("VOICEFLOW_API_KEY:", VOICEFLOW_API_KEY ? "✅ Loaded" : "❌ Not Loaded");

const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { message } = req.body;
  const userId = req.user?.id;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  if (!VOICEFLOW_API_KEY || !VOICEFLOW_PROJECT_ID) {
    console.error("❌ Missing Voiceflow credentials.");
    return res.status(500).json({ error: "Server configuration error (missing Voiceflow credentials)." });
  }

  try {
    const voiceflowURL = `https://general-runtime.voiceflow.com/state/${VOICEFLOW_PROJECT_ID}/user/${userId}/interact`;

    console.log("🔁 Sending message to Voiceflow:", message);
    console.log("🔐 Using Project ID:", VOICEFLOW_PROJECT_ID);
    console.log("🧠 User ID:", userId);

    const vfResponse = await axios.post(
      voiceflowURL,
      { action: { type: 'text', payload: message } },
      {
        headers: {
          Authorization: `Bearer ${VOICEFLOW_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const blocks = vfResponse.data;
    console.log("✅ Voiceflow raw response:", blocks);

    const responses = blocks
      .filter(b => b.type === 'text')
      .map(b => b.payload.message);

    const finalReply = responses.join(' ') || "Oops, I didn’t get that 💭";

    res.json({ response: finalReply });

  } catch (err) {
    console.error("❌ Voiceflow error:", err.message);
    console.error("🔍 Full response:", err.response?.data || "No extra data");

    res.status(500).json({ error: "Failed to get response from CutieBot 💔" });
  }
});

export default router;
