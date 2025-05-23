// helpers.js
export const apiFetch = async (endpoint, options = {}) => {
    const BASE_URL = window.location.origin; // Auto-detects domain (localhost:5000 or yoursite.com)
    const fullUrl = `${BASE_URL}${endpoint}`;
  
    const response = await fetch(fullUrl, options);
    return response;
  };
  