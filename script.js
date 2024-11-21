document.addEventListener("DOMContentLoaded", function () {
    // Cache DOM elements
    const body = document.body;
    const arrowBox = document.querySelector(".arrow-box");
    const gallerySection = document.getElementById("gallery");
    const imageModal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const closeModal = document.getElementById("closeModal");
    const prevImage = document.getElementById("prevImage");
    const nextImage = document.getElementById("nextImage");
    const toggleButton = document.getElementById("toggleButton");

    // Image gallery configuration
    const imageFiles = Array.from({ length: 40 }, (_, i) => `images/${i + 1}.jpg`);
    let currentIndex = 0;

    // Smooth scroll to gallery
    arrowBox.addEventListener("click", () => {
        gallerySection.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    // Create gallery images
    function createGallery() {
        imageFiles.forEach((imageFile, i) => {
            const img = document.createElement("img");
            img.src = imageFile;
            img.alt = `Street Photo ${i + 1}`;
            img.loading = "lazy";
            img.addEventListener("click", () => openModal(i));
            gallerySection.appendChild(img);
        });
    }

    // Modal functions
    function openModal(index) {
        currentIndex = index;
        modalImage.src = imageFiles[currentIndex];
        modalImage.alt = `Street Photo ${currentIndex + 1}`;
        imageModal.style.display = "flex"; // Use flex instead of block
        document.addEventListener("keydown", handleKeyPress);
        body.style.overflow = "hidden"; // Prevent background scrolling
    }

    function closeModalHandler() {
        imageModal.style.display = "none";
        document.removeEventListener("keydown", handleKeyPress);
        body.style.overflow = ""; // Restore scrolling
    }

    function navigateImages(direction) {
        currentIndex = (currentIndex + direction + imageFiles.length) % imageFiles.length;
        
        // Create new image to prevent jumping
        const newImage = new Image();
        newImage.onload = function() {
            modalImage.src = this.src;
            modalImage.alt = `Street Photo ${currentIndex + 1}`;
        };
        newImage.src = imageFiles[currentIndex];
    }

    function handleKeyPress(e) {
        switch(e.key) {
            case "Escape":
                closeModalHandler();
                break;
            case "ArrowLeft":
                navigateImages(-1);
                break;
            case "ArrowRight":
                navigateImages(1);
                break;
        }
    }

    // Handle touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    imageModal.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
    });

    imageModal.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50; // minimum distance for swipe
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swiped right
                navigateImages(-1);
            } else {
                // Swiped left
                navigateImages(1);
            }
        }
    }

    // Event listeners
    closeModal.addEventListener("click", closeModalHandler);
    prevImage.addEventListener("click", () => navigateImages(-1));
    nextImage.addEventListener("click", () => navigateImages(1));
    toggleButton.addEventListener("click", toggleDarkMode);

    // Click outside modal to close
    imageModal.addEventListener("click", (e) => {
        if (e.target === imageModal) {
            closeModalHandler();
        }
    });

    // Dark mode functionality
    function toggleDarkMode() {
        body.classList.toggle("dark-mode");
        const isDarkMode = body.classList.contains("dark-mode");
        const toggleIcon = toggleButton.querySelector("i");
        if (isDarkMode) {
            toggleIcon.classList.replace("fa-sun", "fa-moon"); // Moon icon for dark mode
        } else {
            toggleIcon.classList.replace("fa-moon", "fa-sun"); // Sun icon for light mode
        }
        localStorage.setItem("darkMode", isDarkMode);
        updateToggleIcon(isDarkMode);
    }

    function updateToggleIcon(isDarkMode) {
        const toggleIcon = toggleButton.querySelector("i");
        if (isDarkMode) {
            toggleIcon.classList.replace("fa-sun", "fa-moon"); // Use moon icon for dark mode
        } else {
            toggleIcon.classList.replace("fa-moon", "fa-sun"); // Use sun icon for light mode
        }
    }

    // Initialize dark mode from localStorage
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    if (savedDarkMode) {
        body.classList.add("dark-mode");
        toggleButton.querySelector("i").classList.replace("fa-sun", "fa-moon");
    }    

    updateToggleIcon(savedDarkMode);

    // Event Listener for Dark Mode Toggle
    toggleButton.addEventListener("click", toggleDarkMode);

    // Initialize gallery
    createGallery();
});
