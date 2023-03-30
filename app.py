from flask import Flask, jsonify, render_template, Response, Request, stream_with_context
import cv2
import numpy as np
import mediapipe as mp
import data_preprocessing
import asana_classification
from PIL import Image
from flask import request, redirect

app = Flask(__name__)

skeleton_extractor = data_preprocessing.SkeletonExtraction()

camera = cv2.VideoCapture(0)


predicted_asana = ""
selected_asana = ""
calories = 0
time = ""
user_details = {
    'username': "",
    'age': "",
    'gender': '',
    'weight': 50,
}
asanasDetails = {
    'downward-facing-dog': {
        'title': "Downward Facing Dog",
        'asana': "downward-facing-dog",
        'imagePath': '../static/img/down_dog.png',
        'METs':2.5
    },
    'goddess': {
        'title': "Goddess",
        'asana': "goddess",
        'imagePath': '../static/img/goddess.png',
        'METs':2.5
    },
    'plank': {
        'title': "Plank",
        'asana': "plank",
        'imagePath': '../static/img/plank.png',
        'METs':4.0
    },
    'tree': {
        'title': "Tree",
        'asana': "tree",
        'imagePath': '../static/img/tree.png',
        'METs':2.5
    },
    'warrior-2': {
        'title': "Warrior 2",
        'asana': "warrior-2",
        'imagePath': '../static/img/warrior_2.png',
        'METs':4.0
    }
}
asanaMETs = {
    'Downward Facing Dog':2.5,
    'Goddess':2.5,
    'Plank':4.0,
    'Tree': 2.5,
    'Warrior-2':4.0
}


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
            frame = data_preprocessing.Img2Skeleton(frame)
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

@app.route('/home')
def index():
    return render_template('index.html', asanas=asanasDetails)

@app.route('/asanas')
def asanas():
    return render_template('asanas.html')

@app.route('/user-details-form')
def form():
    return render_template('user-details-form.html')


@app.route('/tutorial/<asana>')
def tutorial(asana):
    global selected_asana
    selected_asana = asanasDetails[asana]['title']
    return render_template('tutorial.html', selected_asana=selected_asana)

@app.route('/summary')
def summary():
    return render_template('summary.html', calories=calories, time=time, userDetails=user_details)


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
    return jsonify(selected_asana=selected_asana)


@app.route('/get-calories')
def get_calories():
    return jsonify(selected_asana=selected_asana,predicted_asana=predicted_asana,METs=asanaMETs[selected_asana],weight=user_details['weight'])

@app.route('/post-user-details', methods=["POST"])
def post_user_details():
    global user_details
    user_details['username'] = request.form['username']
    user_details['age'] = request.form['age']
    user_details['gender'] = request.form['gender']
    user_details['weight'] = request.form['weight']
    return redirect("/asanas")

@app.route('/post-calories-and-time', methods=["POST"])
def post_calories_and_time():
    data = request.get_json()
    global calories
    calories = data["calories"]
    global time
    time = data["time"]
    return redirect("/summary")


if __name__ == '__main__':
    app.run()