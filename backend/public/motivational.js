 let tipIndex = 0;
const tipCarousel = document.getElementById("tip-carousel");
const slides = document.querySelectorAll(".slide");
const totalTips = slides.length;

function nextTip() {
    tipIndex = (tipIndex + 1) % totalTips; // Loop back to first slide automatically
    updateTipCarousel();
}

function prevTip() {
    tipIndex = (tipIndex - 1 + totalTips) % totalTips; // Loop to last slide when at the start
    updateTipCarousel();
}

function updateTipCarousel() {
    tipCarousel.style.transition = "transform 0.6s ease-in-out"; // Smooth transition
    tipCarousel.style.transform = `translateX(-${tipIndex * 100}%)`; // Corrected interpolation
}

document.getElementById("challenges-btn").addEventListener("click", function() {
    window.location.href = "challenges.html"; // Redirect to challenges page
});

function goBack() {
            window.location.href="tips.html";
        }

    
