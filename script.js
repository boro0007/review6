document.querySelectorAll('.slider-container').forEach((container) => {
    const slider = container.querySelector('.slider');
    const cards = container.querySelectorAll('.card');
    const nextBtn = container.querySelector('.next');
    const prevBtn = container.querySelector('.prev');

    let index = 0;
    const totalSlides = cards.length;

    function updateSlider() {
        slider.style.transform = `translateX(-${index * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
        index = (index + 1) % totalSlides; // Loop back to first
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        index = (index - 1 + totalSlides) % totalSlides; // Loop back to last
        updateSlider();
    });
});

// for zoom effect of card
function zoomEffect(element) {
    document.querySelectorAll('.service-card').forEach(card => {
        card.classList.remove('zoom-effect');
    });
    element.classList.add('zoom-effect');
}

//google review
async function fetchGoogleReviews() {
    const placeId = "YOUR_PLACE_ID"; // Replace with your Google Place ID
    const apiKey = "YOUR_API_KEY"; // Replace with your Google API Key

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.result && data.result.reviews) {
            let reviewsHTML = "";
            data.result.reviews.forEach(review => {
                reviewsHTML += `
                    <div class="review">
                        <strong>${review.author_name}</strong> (${review.rating} ⭐)
                        <p>${review.text}</p>
                    </div>
                `;
            });
            document.getElementById("reviews").innerHTML = reviewsHTML;
        } else {
            document.getElementById("reviews").innerHTML = "<p>No reviews available.</p>";
        }
    } catch (error) {
        console.error("Error fetching reviews:", error);
    }
}

fetchGoogleReviews();