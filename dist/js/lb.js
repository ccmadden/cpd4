document.addEventListener('DOMContentLoaded', () => {
    const athleteImages = document.querySelectorAll('.athlete a');
    let currentIndex = 0;

    athleteImages.forEach((imageLink, index) => {
        imageLink.addEventListener('click', function(event) {
            event.preventDefault();

            currentIndex = index;
            const imageUrl = this.getAttribute('href');
            const imageTitle = this.getAttribute('data-title');

            openLightbox(imageUrl, imageTitle);
        });
    });

    function openLightbox(imageUrl, imageTitle) {
        // Check if overlay already exists
        let lightboxOverlay = document.querySelector('.lightbox-overlay');
        if (!lightboxOverlay) {
            // Create overlay if it doesn't exist
            lightboxOverlay = document.createElement('div');
            lightboxOverlay.classList.add('lightbox-overlay');
            document.body.appendChild(lightboxOverlay);

            // Create lightbox image element
            const lightboxImage = document.createElement('img');
            lightboxImage.classList.add('lightbox-image');
            lightboxOverlay.appendChild(lightboxImage);

            // Create caption
            const caption = document.createElement('p');
            caption.classList.add('lightbox-caption');
            lightboxOverlay.appendChild(caption);

            // Add Next and Back buttons
            const nextButton = document.createElement('img');
            nextButton.src = '../dist/images/next.png';
            nextButton.classList.add('lightbox-next');
            nextButton.addEventListener('click', showNextImage);
            lightboxOverlay.appendChild(nextButton);

            const backButton = document.createElement('img');
            backButton.src = '../dist/images/prev.png';
            backButton.classList.add('lightbox-back');
            backButton.addEventListener('click', showPreviousImage);
            lightboxOverlay.appendChild(backButton);

            // Add close button
            const closeButton = document.createElement('span');
            closeButton.classList.add('lightbox-close');
            closeButton.innerHTML = '&times;';
            closeButton.addEventListener('click', closeLightbox);
            lightboxOverlay.appendChild(closeButton);

            // Close lightbox when clicking outside image
            lightboxOverlay.addEventListener('click', function(event) {
                if (event.target === lightboxOverlay) {
                    closeLightbox();
                }
            });
        }

        updateLightbox(imageUrl, imageTitle);
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % athleteImages.length;
        const nextImage = athleteImages[currentIndex];
        updateLightbox(nextImage.getAttribute('href'), nextImage.getAttribute('data-title'));
    }

    function showPreviousImage() {
        currentIndex = (currentIndex - 1 + athleteImages.length) % athleteImages.length;
        const prevImage = athleteImages[currentIndex];
        updateLightbox(prevImage.getAttribute('href'), prevImage.getAttribute('data-title'));
    }

    function updateLightbox(imageUrl, imageTitle) {
        const lightboxImage = document.querySelector('.lightbox-image');
        const caption = document.querySelector('.lightbox-caption');
        lightboxImage.src = imageUrl;
        lightboxImage.alt = imageTitle;
        caption.textContent = imageTitle;
    }

    function closeLightbox() {
        const lightboxOverlay = document.querySelector('.lightbox-overlay');
        if (lightboxOverlay) {
            lightboxOverlay.remove();
        }
    }
});
