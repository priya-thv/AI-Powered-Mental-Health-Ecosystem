document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('generateBtn').addEventListener('click', async () => {
      const query = document.getElementById('musicInput').value.trim();
      const resultsContainer = document.getElementById('results');
      resultsContainer.innerHTML = '';
  
      if (!query) {
        resultsContainer.innerHTML = '<p>Please enter a music type or mood.</p>';
        return;
      }
  
      try {
        const res = await fetch(`/api/meditation/search-meditation?query=${encodeURIComponent(query)}`);
        const data = await res.json();
  
        if (!res.ok || !data.videos) {
          resultsContainer.innerHTML = '<p>Something went wrong. Try again.</p>';
          return;
        }
  
        if (data.videos.length === 0) {
          resultsContainer.innerHTML = '<p>No videos found.</p>';
          return;
        }
  
        data.videos.forEach(video => {
          const card = document.createElement('div');
          card.className = 'video-card';
          card.innerHTML = `
            <img src="${video.thumbnail}" alt="${video.title}" />
            <h3>${video.title}</h3>
            <iframe width="300" height="180"
                    src="https://www.youtube.com/embed/${video.videoId}"
                    frameborder="0" allowfullscreen></iframe>
          `;
          resultsContainer.appendChild(card);
        });
      } catch (error) {
        console.error('Error fetching videos:', error);
        resultsContainer.innerHTML = '<p>Error fetching videos.</p>';
      }
    });
  });
  