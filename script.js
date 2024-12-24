document.addEventListener("DOMContentLoaded", () => {
    const uploadButton = document.querySelector(".upload-button");
    const uploadInput = document.getElementById("upload-input");
    const videoGrid = document.getElementById("video-grid");

    // Handle upload button click
    uploadButton.addEventListener("click", () => {
        uploadInput.click(); // Simulate a click on the hidden file input
    });

    // Handle file upload
    uploadInput.addEventListener("change", (event) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            Array.from(files).forEach(file => {
                if (file.type.startsWith("video/")) {
                    const videoURL = URL.createObjectURL(file);
                    addVideoToGrid(videoURL, file.name);
                } else {
                    alert("Please upload a valid video file.");
                }
            });

            // Clear the input to allow re-uploading the same file if needed
            uploadInput.value = "";
        }
    });

    // Add video to the grid
    function addVideoToGrid(videoURL, title) {
        const videoCard = document.createElement("div");
        videoCard.className = "video-card";
        videoCard.innerHTML = `
            <video controls>
                <source src="${videoURL}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <h3>${title}</h3>
        `;
        videoGrid.appendChild(videoCard);
    }
});
