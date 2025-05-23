import { requireAuth } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
  const token = requireAuth();
  if (!token) return;

  // Set up navigation buttons
  document.getElementById('chatbotbtn')?.addEventListener('click', () => {
    console.log('TOKEN:', token);

    window.location.href = '/chatbot.html';
  });

  document.getElementById('meditationbtn')?.addEventListener('click', () => {
    window.location.href = '/meditation.html';
  });

  document.getElementById('reflectivebtn')?.addEventListener('click', () => {
    window.location.href = '/reflective.html';
  });

  document.getElementById('ritualsbtn')?.addEventListener('click', () => {
    window.location.href = '/rituals.html';
  });

  document.getElementById('soundsbtn')?.addEventListener('click', () => {
    window.location.href = '/sound.html';
  });
});
