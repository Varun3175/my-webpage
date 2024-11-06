import cv2
import time

cap = cv2.VideoCapture(1)  # 0 is typically the default webcam

if not cap.isOpened():
    print("Error: Could not open camera.")


print("Camera is recording...")
start_time = time.time()

while True:
    ret, frame = cap.read()
    if not ret:
        print("Failed to capture image.")
        break

    # Display the live video feed
    cv2.imshow("Recording", frame)

        # Exit if the user presses 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        print("Recording stopped manually.")
        break

# Release resources
cap.release()
cv2.destroyAllWindows()