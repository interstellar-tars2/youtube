document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.getAttribute("data-page");

    if (page === "home") {
        loadVideos();
    } else if (page === "upload") {
        setupUploadForm();
    } else if (page === "video") {
        loadVideo();
    }
});

// Load videos for the home page
async function loadVideos() {
    const videoGrid = document.getElementById("video-grid");

    try {
        const response = await fetch("/videos");
        const videos = await response.json();

        videos.forEach((video) => {
            const videoCard = document.createElement("div");
            videoCard.className = "video-card";
            videoCard.innerHTML = `
                <a href="video.html?id=${video.id}">
                    <img src="${video.thumbnail}" alt="${video.title}">
                    <h3>${video.title}</h3>
                </a>
            `;
            videoGrid.appendChild(videoCard);
        });
    } catch (error) {
        console.error("Error loading videos:", error);
    }
}

// Set up the upload form
function setupUploadForm() {
    const uploadForm = document.getElementById("upload-form");

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
        window.location.href = "index.html";
    });
}

// Load a single video
async function loadVideo() {
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get("id");

    if (!videoId) {
        alert("Video not found.");
        window.location.href = "index.html";
        return;
    }

    try {
        const response = await fetch(`/videos/${videoId}`);
        const video = await response.json();

        document.getElementById("video-title").textContent = video.title;
        document.getElementById("video-player").src = video.videoUrl;
        document.getElementById("video-thumbnail").src = video.thumbnail;
    } catch (error) {
        console.error("Error loading video:", error);
    }
}
