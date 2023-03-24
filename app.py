from flask import Flask, jsonify, render_template, Response, Request, stream_with_context
import cv2
import numpy as np
import mediapipe as mp
import data_preprocessing
import asana_classification
from PIL import Image

app = Flask(__name__)

skeleton_extractor = data_preprocessing.SkeletonExtraction()

camera = cv2.VideoCapture(0)

predicted_asana = ""

selected_asana = ""

weight = 35


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
            global predicted_asana
            predicted_asana = mapper(asana_classification.classify(frame))
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


def mapper(asana):
    if asana == 0:
        return "Downward Facing Dog"
    if asana == 1:
        return "Goddess"
    if asana == 2:
        return "Plank"
    if asana == 3:
        return "Tree"
    if asana == 4:
        return "Warrior 2"
    return ""


asanasDetails = {
    'downward-facing-dog': {
        'title': "Downward Facing Dog",
        'asana': "downward-facing-dog",
        'imagePath': '../static/img/down_dog.png'
    },
    'goddess': {
        'title': "Goddess",
        'asana': "goddess",
        'imagePath': '../static/img/goddess.png'
    },
    'plank': {
        'title': "Plank",
        'asana': "plank",
        'imagePath': '../static/img/plank.png'
    },
    'tree': {
        'title': "Tree",
        'asana': "tree",
        'imagePath': '../static/img/tree.png'
    },
    'warrior-2': {
        'title': "Warrior 2",
        'asana': "warrior-2",
        'imagePath': '../static/img/warrior_2.png'
    }
}


@app.route('/home')
def index():
    return render_template('index.html', asanas=asanasDetails)


@app.route('/asanas')
def asanas():
    return render_template('asanas.html')


@app.route('/tutorial/<asana>')
def tutorial(asana):
    global selected_asana
    selected_asana = asana
    return render_template('tutorial.html', selected_asana = asanasDetails[selected_asana]["title"])


@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/processed_video_feed')
def processed_video_feed():
    return Response(gen_processed_video_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/get-predicted-asana')
def get_predicted_asana():
    return jsonify(predicted_asana=predicted_asana)


@app.route('/get-selected-asana')
def get_selected_asana():
    return jsonify(selected_asana=asanasDetails[selected_asana]["title"])


@app.route('/get-calories')
def get_calories():
    return jsonify(selected_asana=selected_asana,predicted_asana=predicted_asana,weight=weight)


if __name__ == '__main__':
    app.run()
