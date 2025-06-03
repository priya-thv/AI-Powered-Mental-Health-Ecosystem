import { requireAuth } from './auth.js';
import { apiFetch } from './helpers.js'; // import your fetch helper

document.addEventListener('DOMContentLoaded', () => {
  const token = requireAuth();
  if (!token) return;

  // Navigation buttons
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

  // Updated Logout button using apiFetch with safer response handling
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      try {
        const response = await apiFetch('/api/auth/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // credentials: 'include', // uncomment if needed
        });

        if (!response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            alert(errorData.error || 'Logout failed! Please try again.');
          } else {
            alert('Logout failed! Please try again.');
          }
          return;
        }

        // On successful logout
        localStorage.removeItem('token');
        localStorage.removeItem('fullname');
        localStorage.removeItem('email');

        alert('Logged out successfully!');
        window.location.href = '/login.html';
      } catch (error) {
        console.error('Logout Error:', error);
        alert('Logout failed! Please try again.');
      }
    });
  }
});
