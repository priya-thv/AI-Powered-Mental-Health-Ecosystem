// import dotenv from 'dotenv';
// dotenv.config();
// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';

// import http from 'http';
// import { Server } from 'socket.io';
// import authmiddleware from './middleware/auth.js';
// // Routes
// import authRoutes from './routes/auth.routes.js';
// import chatRoutes from './routes/chat.routes.js';
// import fetch from 'node-fetch'; // If not installed, run: npm i node-fetch
// // After other imports
// import soundsRoutes from './routes/music.routes.js';

// import meditationRoutes from './routes/meditation.route.js';
// // MongoDB connection
// import connectToMongoDB from './db/mongodb.js';
// import profileRoutes from './routes/profiles.routes.js';

// dotenv.config();

// const app = express();
// app.use(cookieParser());

// // Create HTTP server for socket.io
// const server = http.createServer(app);

// // Setup Socket.io
// const io = new Server(server, {
//   cors: {
//     origin: '*',
//   },
// });

// // Middlewares
// app.use(cors());
// app.use(express.json());
// app.use(express.static('public'));

// // Serve frontend (index.html) for the root route
// import { dirname, join } from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// app.use(express.static(join(__dirname, 'public')));



// // API Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/chat',authmiddleware, chatRoutes);

// // After other app.use() calls
// app.use('/api/music', soundsRoutes);
// app.use('/api/meditation', meditationRoutes);
// console.log('✔️ Meditation routes mounted at /api/meditation');
// // ... other app.use() routes here
// app.use('/api', profileRoutes);



// // Socket.IO connection
// io.on('connection', (socket) => {
//   console.log('🧠 New socket connected:', socket.id);

//   socket.on('chat message', (msg) => {
//     console.log('✉️ Message received:', msg);
//     io.emit('chat message', msg);
//   });

//   socket.on('disconnect', () => {
//     console.log('👋 User disconnected:', socket.id);
//   });
// });

// // MongoDB connection and server start
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   connectToMongoDB(); // This will connect to MongoDB
//   console.log(`🚀 Server running on port ${PORT}`);
// });


import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';
import fetch from 'node-fetch'; // Only needed if you use it somewhere

// Routes
import authRoutes from './routes/auth.routes.js';
import chatRoutes from './routes/chat.routes.js';
import soundsRoutes from './routes/music.routes.js';
import meditationRoutes from './routes/meditation.route.js';
import profileRoutes from './routes/profiles.routes.js';

// MongoDB
import connectToMongoDB from './db/mongodb.js';

// Middleware
import authmiddleware from './middleware/auth.js';

// Setup Express
const app = express();
const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Setup Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Serve static frontend files from 'public'
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ✅ Serve static files (IMPORTANT FOR RENDER!)
app.use(express.static(join(__dirname, 'public')));

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/chat', authmiddleware, chatRoutes);
app.use('/api/music', soundsRoutes);
app.use('/api/meditation', meditationRoutes);
app.use('/api', profileRoutes);

console.log('✔️ Routes are registered');

// ✅ OPTIONAL: If you're using client-side routing (e.g., React, Vue)
// app.get('*', (req, res) => {
//   res.sendFile(join(__dirname, 'public', 'index.html'));
// });

// --- Socket.IO Events ---
io.on('connection', (socket) => {
  console.log('🧠 New socket connected:', socket.id);

  socket.on('chat message', (msg) => {
    console.log('✉️ Message received:', msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('👋 User disconnected:', socket.id);
  });
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  await connectToMongoDB();
  console.log(`🚀 Server running on port ${PORT}`);
});

