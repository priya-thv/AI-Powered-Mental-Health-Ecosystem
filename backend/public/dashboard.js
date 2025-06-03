// import { requireAuth } from './auth.js';

// document.addEventListener('DOMContentLoaded', () => {
//   const token = requireAuth();
//   if (!token) return;

//   // Set up navigation buttons
//   document.getElementById('chatbotbtn')?.addEventListener('click', () => {
//     console.log('TOKEN:', token);

//     window.location.href = '/chatbot.html';
//   });

//   document.getElementById('meditationbtn')?.addEventListener('click', () => {
//     window.location.href = '/meditation.html';
//   });

//   document.getElementById('reflectivebtn')?.addEventListener('click', () => {
//     window.location.href = '/reflective.html';
//   });

//   document.getElementById('ritualsbtn')?.addEventListener('click', () => {
//     window.location.href = '/rituals.html';
//   });

//   document.getElementById('soundsbtn')?.addEventListener('click', () => {
//     window.location.href = '/sound.html';
//   });
// });


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

  // Logout button using apiFetch (like your login code)
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      try {
        const response = await apiFetch('/api/auth/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // Add credentials if your apiFetch supports it and you need it for cookies:
          // credentials: 'include',
        });

        const data = await response.json();

        if (response.ok) {
          // Remove user session info from localStorage
          localStorage.removeItem('token');
          localStorage.removeItem('fullname');
          localStorage.removeItem('email');

          alert('Logged out successfully!');
          window.location.href = '/login.html';
        } else {
          alert(data.error || 'Logout failed! Please try again.');
        }
      } catch (error) {
        console.error('Logout Error:', error);
        alert('Logout failed! Please try again.');
      }
    });
  }
});
