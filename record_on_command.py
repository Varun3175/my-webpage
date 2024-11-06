import cv2
import time

def start_camera(duration=10):
    # Open the camera
    cap = cv2.VideoCapture(1)  # 0 is typically the default webcam

    if not cap.isOpened():
        print("Error: Could not open camera.")
        return

    print("Camera is recording...")
    start_time = time.time()

    while True:
        ret, frame = cap.read()
        if not ret:
            print("Failed to capture image.")
            break

        # Display the live video feed
        cv2.imshow("Recording", frame)

        # Stop recording after the specified duration
        if time.time() - start_time > duration:
            print("Finished recording.")
            break

        # Exit if the user presses 'q'
        if cv2.waitKey(1) & 0xFF == ord('q'):
            print("Recording stopped manually.")
            break

    # Release resources
    cap.release()
    cv2.destroyAllWindows()

def listen_for_record():
    print("Listening for 'record' command...")
    while True:
        # Simulate receiving incoming text (replace this with actual input in a real case)
        incoming_text = input("Enter incoming text: ")

        # Check if 'record' is present in the incoming text
        if "record" in incoming_text.lower():
            start_camera(10)  # Record for 10 seconds

        if "end" in incoming_text.lower():
            break

# Start listening
listen_for_record()
