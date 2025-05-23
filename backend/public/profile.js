import { apiFetch } from './helpers.js';

const email = localStorage.getItem('email') || 'test@example.com';
const getUsername = e => e.split('@')[0];

const usernameInput = document.getElementById('username');
const nameInput     = document.getElementById('name');
const bioInput      = document.getElementById('bio');
const moodSelect    = document.getElementById('mood');
const form          = document.getElementById('profileForm');
const loadingText   = document.getElementById('loadingText');

async function loadProfile() {
  try {
    const response = await fetch(`/api/profile?email=${encodeURIComponent(email)}&_=${Date.now()}`);
    const data = await response.json();

    console.log('Profile loaded:', data);

    usernameInput.value = getUsername(email);
    nameInput.value     = data.name ?? '';
    bioInput.value      = data.bio ?? '';
    moodSelect.value    = data.mood ?? 'neutral';

    loadingText.style.display = 'none';
  } catch (err) {
    console.warn('Profile load failed:', err.message);
    usernameInput.value = getUsername(email);
    nameInput.value = '';
    bioInput.value = '';
    moodSelect.value = 'neutral';
    loadingText.textContent = 'No profile found – please create one.';
  }
}

async function saveProfile(event) {
  event.preventDefault();

  const updated = {
    email,
    name : nameInput.value.trim(),
    bio  : bioInput.value.trim(),
    mood : moodSelect.value
  };

  try {
    await apiFetch('/api/profile', {
      method : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify(updated)
    });
    alert('Profile updated! 🌸');
  } catch (err) {
    console.error('Profile save:', err.message);
    alert('Error saving profile – please try again.');
  }
}

await loadProfile();
form.addEventListener('submit', saveProfile);
