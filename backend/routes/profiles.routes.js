

// import express from 'express';
// import { getProfile,setProfile } from '../controllers/profile.controller.js';

// const router = express.Router();

// router.get('/', getProfile);
// router.post('/', setProfile);

// export default router;

import express from 'express';
import { setProfile, getProfile } from '../controllers/profile.controller.js';

const router = express.Router();

// GET profile by email or ID (optional, depends on your frontend)
router.get('/profile', getProfile);

// POST or PUT to update profile
router.put('/profile', setProfile); // or use .put if it's more appropriate

export default router;
