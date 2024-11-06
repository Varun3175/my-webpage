const express = require('express');



const NodeWebcam = require('node-webcam');
const path = require('path');
const cors = require('cors');  // Import the cors package
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
const PORT = 3000;

// Enable CORS for all origins
app.use(cors());  // Allow requests from any origin

// Set up webcam options
const webcamOptions = {
    width: 1280,
    height: 720,
    delay: 0,
    saveShots: true,
    output: "jpeg",
    quality: 100
};
const Webcam = NodeWebcam.create(webcamOptions);

// API endpoint to activate the camera



app.post('/activate-camera', (req, res) => {
    console.log("Camera activation request received");
    const snapshotPath = path.join(__dirname, 'public', 'camera_snapshot.jpg');
    // Take a snapshot
    
    
    Webcam.capture(snapshotPath, (err, data) => {
        if (err) {
            console.error("Error accessing the camera:", err);
            res.status(500).send({ message: "Camera error" });
            return;
        }
        console.log("Snapshot taken");
        // Optionally, you could save the snapshot or handle the data as needed.

        // Log the absolute URL of the image to see where it's located on the server
        const fullSnapshotUrl = path.resolve(snapshotPath);
        console.log("Full path to snapshot image: ", fullSnapshotUrl);  // Log the full path of the snapshot image
        

        // Simulate a snapshot taken and send the URL
        const snapUrl = '/camera_snapshot.jpg';  // Relative URL from the public folder
        console.log("Snapshot URL to be sent:", snapUrl);  // Log the URL being sent in the response


        res.send({ message: "Snapshot taken", 
            snapshotUrl: snapUrl });
    });

    // Set a timer to turn off the camera after 10 seconds
    setTimeout(() => {
        console.log("Camera deactivated after 10 seconds");
    }, 10000);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


