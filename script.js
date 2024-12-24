document.addEventListener("DOMContentLoaded", () => {
    const uploadButton = document.querySelector(".upload-button");
    const uploadInput = document.getElementById("upload-input");
    const videoGrid = document.getElementById("video-grid");

    // Fetch and display videos
    async function fetchVideos() {
        try {
            const response = await fetch("/videos");
            const videos = await response.json();

            videoGrid.innerHTML = ""; // Clear the grid
            videos.forEach((video) => {
                addVideoToGrid(video.url, video.title);
            });
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    }

    // Handle upload button click
    uploadButton.addEventListener("click", () => {
        uploadInput.click();
    });

    // Handle file upload
    uploadInput.addEventListener("change", async (event) => {
        const file = event.target.files[0];

        if (file) {
            const videoUrl = URL.createObjectURL(file);
            const title = prompt("Enter a title for your video:");

            if (title) {
                // Save metadata
                const metadata = { title, url: videoUrl };
                await fetch("/upload-metadata", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(metadata),
                });

                addVideoToGrid(videoUrl, title);
            }
        }
    });

    // Add video to the grid
    function addVideoToGrid(videoUrl, title) {
        const videoCard = document.createElement("div");
        videoCard.className = "video-card";
        videoCard.innerHTML = `
            <video controls>
                <source src="${videoUrl}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <h3>${title}</h3>
        `;
        videoGrid.appendChild(videoCard);
    }

    // Initialize
    fetchVideos();
});
