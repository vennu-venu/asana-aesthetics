from flask import Flask, render_template, Response, Request, stream_with_context
import cv2
import numpy as np
import mediapipe as mp
import time

import frame_generation
import data_preprocessing
import asana_classification
from PIL import Image

app = Flask(__name__)

skeleton_extractor = data_preprocessing.SkeletonExtraction()
camera = cv2.VideoCapture(0)
pose = "Not yet detected"
    
@app.route('/')
def index():
    return render_template('index.html', pose = pose)


@app.route('/video_feed')
def video_feed():
    return Response(frame_generation.gen_video_frames(camera), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/processed_video_feed')
def processed_video_feed():
    return Response(frame_generation.gen_frames(camera), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/classify')
def classify():
    return Response(frame_generation.classify(camera), mimetype='text/plain')

if __name__ == '__main__':
    app.run()