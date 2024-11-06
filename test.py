import cv2
camera = cv2.VideoCapture(0)
while True:
    ret, frame = camera.read()
    if not ret:
        print("Failed to capture image.")
        break

    # Display the live video feed
    cv2.imshow("Recording", frame)

        # Exit if the user presses 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        print("Recording stopped manually.")
        break
camera.release()
