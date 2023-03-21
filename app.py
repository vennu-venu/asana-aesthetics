from flask import Flask, jsonify, render_template, Response, Request, stream_with_context
import cv2
import numpy as np
import mediapipe as mp
import time
import data_preprocessing
import asana_classification
from PIL import Image

app = Flask(__name__)

skeleton_extractor = data_preprocessing.SkeletonExtraction()

camera = cv2.VideoCapture(0)

predicted_pose = "Not yet detected"


def gen_frames():
    while True:
        success, frame = camera.read()
        if not success:
            break
        else:
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


def gen_processed_video_frames():
    while True:
        success, frame = camera.read()
        if not success:
            break
        else:
            frame = skeleton_extractor.getSkeleton(frame)
            frame = data_preprocessing.resize_with_padding(Image.fromarray(
                cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)).convert("L"), (224, 224))
            frame = np.array(frame)
            global predicted_pose
            predicted_pose = mapper(asana_classification.classify(frame))
        #   time.sleep(0.5)
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


def mapper(pose):
    if pose == 0:
        return "Downdog"
    if pose == 1:
        return "Goddess"
    if pose == 2:
        return "Plank"
    if pose == 3:
        return "Tree"
    if pose == 4:
        return "Warrior"


@app.route('/home')
def index():
    return render_template('index.html')


@app.route('/asanas')
def asanas():
    return render_template('asanas.html')


@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/processed_video_feed')
def processed_video_feed():
    return Response(gen_processed_video_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/get-pose')
def get_pose():
    return jsonify(pose=predicted_pose)


if __name__ == '__main__':
    app.run()
