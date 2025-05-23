import { apiFetch } from './helpers.js';

document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');

  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmpassword = document.getElementById('confirmpassword').value.trim();

    try {
      const response = await apiFetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname, email, password,confirmpassword }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        alert('Signup successful! Redirecting to login...');
        window.location.href = '/login.html';
      } else {
        alert(data.message || 'Signup failed!');
      }
    } catch (error) {
      console.error('Signup Error:', error);
      alert('Signup failed! Please try again.');
    }
  });
});
