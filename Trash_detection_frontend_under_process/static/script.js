// Append bot messages
document.addEventListener("DOMContentLoaded", function () {
    const chatbox = document.getElementById("chat-box"); // Fixed ID reference
    const uploadForm = document.getElementById("uploadForm");
    const imageUpload = document.getElementById("image-upload"); // Fixed ID reference

    appendBotMessage("🗑️ Trash Query: Know your trash", "bot-message");

    uploadForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form refresh

        const file = imageUpload.files[0];
        if (!file) {
            appendBotMessage("⚠️ Please select an image first.", "error-message");
            return;
        }

        appendBotMessage("⏳ Uploading image...", "loading-message");

        const formData = new FormData();
        formData.append("image", file);

        fetch("/upload", {
            method: "POST",
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                appendBotMessage(`❌ ${data.error}`, "error-message");
            } else {
                appendBotMessage(`✅ Objects detected: <strong>${data.caption}</strong>`, "bot-message");
                appendImage(data.image_url);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            appendBotMessage("⚠️ An error occurred while processing the image.", "error-message");
        });
    });
});

// Append bot messages
function appendBotMessage(message, type = "bot-message") {
    const chatbox = document.getElementById("chat-box"); // Fixed ID reference
    const messageElement = document.createElement("div");
    messageElement.classList.add(type);
    messageElement.innerHTML = `<div class="message-content">${message}</div>`;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}

// Show uploaded image
function appendImage(imgSrc) {
    const chatbox = document.getElementById("chat-box"); // Fixed ID reference
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");

    const imgElement = document.createElement("img");
    imgElement.classList.add("generated-image");
    imgElement.src = imgSrc;
    imgElement.alt = "Uploaded Image";
    
    imageContainer.appendChild(imgElement);
    chatbox.appendChild(imageContainer);
    chatbox.scrollTop = chatbox.scrollHeight;
}
