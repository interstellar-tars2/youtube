document.addEventListener("DOMContentLoaded", () => {
    const uploadButton = document.querySelector(".upload-button");
    const uploadInput = document.getElementById("upload-input");
    const videoGrid = document.getElementById("video-grid");

    // Handle upload button click
    uploadButton.addEventListener("click", () => {
        uploadInput.click();
    });

    // Handle file upload
    uploadInput.addEventListener("change", async (event) => {
        const file = event.target.files[0];

        if (file) {
            const formData = new FormData();
            formData.append("video", file);

            try {
                const response = await fetch("/upload", {
                    method: "POST",
                    body: formData,
                });

                const data = await response.json();

                if (data.videoUrl) {
                    addVideoToGrid(data.videoUrl, file.name);
                } else {
                    alert("Failed to upload video.");
                }
            } catch (error) {
                console.error("Error uploading video:", error);
                alert("An error occurred while uploading the video.");
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
});
