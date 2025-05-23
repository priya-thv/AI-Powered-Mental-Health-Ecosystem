import { apiFetch } from './helpers.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
      const response = await apiFetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok && data.token) {
        // ✅ Save token and user details to localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('fullname', data.fullname);
        localStorage.setItem('email', data.email); // optional

        alert('Login successful!');
        console.log('TOKEN:', data.token);

        window.location.href = '/dashboard.html'; // Redirect to Lumi
      } else {
        alert(data.error || 'Login failed!');
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('Login failed! Please try again.');
    }
  });
});
