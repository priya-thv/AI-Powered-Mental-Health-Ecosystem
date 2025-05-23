async function getHealingMusic() {
    const emotion = document.getElementById("emotionInput").value.trim();
  
    const resBox = document.getElementById("responseBox");
    resBox.innerHTML = "Creating music for your mood... 🎶";
  
    const res = await fetch("/generate-music", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ emotion })
    });
  
    const data = await res.json();
  
    if (data.url) {
      resBox.innerHTML = `
        <p>Here's a melody created just for this moment 💜</p>
        <audio controls autoplay>
          <source src="${data.url}" type="audio/mpeg">
          Your browser doesn't support the audio element.
        </audio>
      `;
    } else {
      resBox.innerHTML = `<p>Oops! Couldn’t generate music right now.</p>`;
    }
  }
  