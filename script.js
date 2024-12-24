document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.getAttribute("data-page");

    if (page === "studio") {
        setupStudio();
    }
});

function setupStudio() {
    const uploadModal = document.getElementById("upload-modal");
    const openUploadModalButton = document.getElementById("open-upload-modal");
    const closeUploadModalButton = document.getElementById("close-upload-modal");
    const uploadForm = document.getElementById("upload-form");
    const videoGrid = document.getElementById("studio-video-grid");

    // Load user's videos
    loadUserVideos(videoGrid);

    // Open modal
    openUploadModalButton.addEventListener("click", () => {
        uploadModal.classList.add("visible");
    });

    // Close modal
    closeUploadModalButton.addEventListener("click", () => {
        uploadModal.classList.remove("visible");
    });

    // Handle upload form submission
    uploadForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const title = document.getElementById("video-title").value;
        const videoFile = document.getElementById("video-file").files[0];
        const thumbnailFile = document.getElementById("thumbnail-file").files[0];

        if (!title || !videoFile) {
            alert("Title and video file are required.");
            return;
        }

        const videoUrl = URL.createObjectURL(videoFile);
        const thumbnailUrl = thumbnailFile
            ? URL.createObjectURL(thumbnailFile)
            : "default-thumbnail.jpg";

        // Save metadata
        const metadata = { title, videoUrl, thumbnail: thumbnailUrl };
        await fetch("/upload-metadata", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(metadata),
        });

        alert("Video uploaded successfully!");
        uploadModal.classList.remove("visible");
        addVideoToGrid(videoGrid, metadata);
    });
}

function loadUserVideos(videoGrid) {
    fetch("/videos")
        .then((response) => response.json())
        .then((videos) => {
            videos.forEach((video) => {
                addVideoToGrid(videoGrid, video);
            });
        })
        .catch((error) => console.error("Error loading videos:", error));
}

function addVideoToGrid(videoGrid, video) {
    const videoCard = document.createElement("div");
    videoCard.className = "video-card";
    videoCard.innerHTML = `
        <img src="${video.thumbnail}" alt="${video.title}">
        <h3>${video.title}</h3>
    `;
    videoGrid.appendChild(videoCard);
}
