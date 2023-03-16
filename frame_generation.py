import cv2
import data_preprocessing
import asana_classification
from PIL import Image
import numpy as np

skeleton_extractor = data_preprocessing.SkeletonExtraction()

def mapper(pose):
    if pose == 0:
        return "downdog"
    if pose == 1:
        return "goddess"
    if pose == 2:
        return "plank"
    if pose == 3:
        return "tree"
    if pose == 4:
        return "warrior"


def gen_video_frames(camera):
    while True:
        success, frame = camera.read()
        if not success:
            break
        else:
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


def gen_frames(camera):
  while True:
      success, frame = camera.read()
      if not success:
          break
      else:
          frame = skeleton_extractor.getSkeleton(frame)
          frame = data_preprocessing.resize_with_padding(Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)).convert("L"), (224, 224))
          frame = np.array(frame)
          ret, buffer = cv2.imencode('.jpg', frame)
          frame = buffer.tobytes()
          yield (b'--frame\r\n'
              b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
          
def classify(camera):
  while True:
      success, frame = camera.read()
      if not success:
          break
      else:
          frame = skeleton_extractor.getSkeleton(frame)
          frame = data_preprocessing.resize_with_padding(Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)).convert("L"), (224, 224))
          frame = np.array(frame)
          pose = mapper(asana_classification.classify(frame))
          print(pose)
          yield (b'--frame\r\n'
              b'Content-Type: text/plain\r\n\r\n' + pose.encode() + b'\r\n')