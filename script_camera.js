const snapshotContainer = document.getElementById('snapshotContainer');
const activateCamera = document.getElementById('activateCamera');

// Event listener for activating the camera when the button is clicked
activateCamera.addEventListener('click', () => {
    fetch('http://localhost:3000/activate-camera', { method: 'POST' })
        .then(response => response.json())  // Parse the JSON response from the server
        .then(data => {
            console.log("Response Data:", data);  // Log the full response object

            console.log(data.message);  // Logs "Snapshot taken"

            if (snapshotContainer) {
                const img = document.createElement('img');
                
                // Ensure this is the correct relative URL (e.g., '/camera_snapshot.jpg')
                img.src = 'http://localhost:3000' + data.snapshotUrl;  // This should be '/camera_snapshot.jpg'
                img.alt = 'Camera Snapshot';

                console.log("Image source is:", img.src);  // Debug the image source in the browser's console

                snapshotContainer.innerHTML = '';  // Clear previous snapshots
                snapshotContainer.appendChild(img);  // Append the new image to the container
            } else {
                console.error("snapshotContainer element not found");
            }
        })
        .catch(error => {
            console.error("Error during camera activation:", error);
        });
});
