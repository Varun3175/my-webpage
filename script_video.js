const VideoContainer = document.getElementById('VideoContainer');
const activateVideo = document.getElementById('activateVideo');

activateVideo.addEventListener('click', () => {
    const userConfirmed = confirm("Do you wish to switch on the camera temporarily?");

    if (userConfirmed) {
        // Request access to the webcam
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                // Create a video element for streaming
                const video = document.createElement('video');
                video.srcObject = stream;
                video.autoplay = true;
                video.muted = true; // Prevent echo
                video.style.width = '100%';
                video.style.height = 'auto';
                
                // Display the video stream in the container
                VideoContainer.innerHTML = '';  // Clear previous content
                VideoContainer.appendChild(video);

                // Stop the stream after 10 seconds
                setTimeout(() => {
                    stream.getTracks().forEach(track => track.stop()); // Stop the webcam
                    VideoContainer.innerHTML = 'Streaming ended'; // Message after stopping
                }, 10000);  // 10000 ms = 10 seconds
            })
            .catch((error) => {
                console.error("Error accessing webcam:", error);
            });
    } else {
        console.log("User canceled the camera activation.");
    }
});
