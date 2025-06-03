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

document.addEventListener('DOMContentLoaded', () => {
  const token = requireAuth();
  if (!token) return;

  // 🚀 Navigation buttons
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

  // 🔐 Logout Button
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      try {
        const response = await fetch('/logout', {
          method: 'POST',
          credentials: 'include', // Send cookies with the request
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          // 🧹 Clean up frontend session
          localStorage.removeItem('token');
          localStorage.removeItem('fullname');
          localStorage.removeItem('email');

          alert('Logged out successfully!');
          window.location.href = '/login.html'; // Redirect to login
        } else {
          const errorData = await response.json();
          alert(errorData?.error || 'Logout failed. Please try again.');
        }
      } catch (err) {
        console.error('Logout Error:', err);
        alert('Something went wrong while logging out.');
      }
    });
  }
});
