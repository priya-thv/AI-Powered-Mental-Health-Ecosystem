// auth.js
export function requireAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You are not logged in!');
      window.location.href = '/login.html';
      return null;
    }
    return token;
  }
  