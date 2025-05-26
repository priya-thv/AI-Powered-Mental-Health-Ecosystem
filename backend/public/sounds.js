async function getHealingMusic() {
  const emotion = document.getElementById("emotionInput").value.trim().toLowerCase();
  const resBox = document.getElementById("responseBox");
  resBox.innerHTML = "<p>Finding the right sounds for you... 🎶</p>";

  try {
    const res = await fetch(`/api/music/youtube-music?emotion=${encodeURIComponent(emotion)}`);
    const data = await res.json();

    if (!data.videos || data.videos.length === 0) {
      resBox.innerHTML = "<p>No videos found. Try a different feeling?</p>";
      return;
    }

    resBox.innerHTML = "<h3>Here are some healing sounds just for you:</h3>";
    data.videos.forEach(video => {
      const card = document.createElement("div");
      card.className = "video-card";
      card.innerHTML = `
        <h4>${video.title}</h4>
        <iframe width="300" height="180"
                src="https://www.youtube.com/embed/${video.videoId}"
                frameborder="0" allowfullscreen></iframe>
      `;
      resBox.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    resBox.innerHTML = "<p>Error fetching music. Please try again later.</p>";
  }
}
