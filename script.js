document.addEventListener("DOMContentLoaded", function () {
    const arrowBox = document.querySelector(".arrow-box");
    const gallerySection = document.getElementById("gallery");

    arrowBox.addEventListener("click", function () {
        gallerySection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const arrowBox = document.querySelector(".arrow-box");
    const gallerySection = document.getElementById("gallery");

    arrowBox.addEventListener("click", function () {
        gallerySection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const gallerySection = document.getElementById("gallery");
    const imageModal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const closeModal = document.getElementById("closeModal");
    const prevImage = document.getElementById("prevImage");
    const nextImage = document.getElementById("nextImage");

    // An array of unique image file names
    const imageFiles = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg"];
    let currentIndex = 0;

    // Function to create a unique image element and add it to the gallery
    function createUniqueImage(imageFile, i) {
        if (!document.querySelector(`[src="${imageFile}"]`)) {
            const img = document.createElement("img");
            img.src = imageFile;
            img.alt = `Street Photo ${i + 1}`;
            img.addEventListener("click", function () {
                // Display the clicked image in the modal
                currentIndex = i;
                modalImage.src = this.src;
                imageModal.style.display = "block";
            });
            gallerySection.appendChild(img);
        }
    }

    // Create and populate the gallery with unique images
    imageFiles.forEach((imageFile, i) => {
        createUniqueImage(imageFile, i);
    });

    // Close the modal when the close button is clicked
    closeModal.addEventListener("click", function () {
        imageModal.style.display = "none";
    });

    // Navigate to the previous image in the modal
    prevImage.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
            modalImage.src = imageFiles[currentIndex];
        }
    });

    // Navigate to the next image in the modal
    nextImage.addEventListener("click", function () {
        if (currentIndex < imageFiles.length - 1) {
            currentIndex++;
            modalImage.src = imageFiles[currentIndex];
        }
    });
});