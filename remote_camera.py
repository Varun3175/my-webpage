from flask import Flask, Response
import cv2

# Initialize Flask app
app = Flask(__name__)

# Initialize camera
camera = cv2.VideoCapture(0)  # 0 is usually the default USB camera; adjust if needed.

def generate_frames():
    while True:
        # Read the frame from the camera
        success, frame = camera.read()
        if not success:
            break
        else:
            # Encode the frame in JPEG format
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            
            # Yield the frame in a format suitable for HTTP streaming
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

# Route for the video feed
@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

# Start the Flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
