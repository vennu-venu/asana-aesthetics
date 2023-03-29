import mediapipe as mp
import cv2
import numpy as np
from PIL import ImageOps


class SkeletonExtraction():

    def __init__(self, mode=False, comp=1, smooth=True, min_det=0.5, min_track=0.5):
        self.mode = mode
        self.complexity = comp
        self.smooth_landmarks = smooth
        self.enable_segmentation = False
        self.smooth_segmentation = smooth
        self.min_detection_confidence = min_det
        self.min_tracking_confidence = min_track
        self.mpDraw = mp.solutions.drawing_utils
        self.mpPose = mp.solutions.pose
        self.pose = self.mpPose.Pose(self.mode, self.complexity, self.smooth_landmarks, self.enable_segmentation,
                                     self.smooth_segmentation, self.min_detection_confidence, self.min_tracking_confidence)

    def getSkeleton(self, img, draw=True):
        imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        self.results = self.pose.process(imgRGB)
        skeleton = np.zeros(img.shape, dtype=np.uint8)
        if self.results.pose_landmarks:
            if draw:
                self.mpDraw.draw_landmarks(
                    skeleton, self.results.pose_landmarks, self.mpPose.POSE_CONNECTIONS)
        return skeleton


def padding(img, expected_size):
    desired_size = expected_size
    delta_width = desired_size - img.size[0]
    delta_height = desired_size - img.size[1]
    pad_width = delta_width // 2
    pad_height = delta_height // 2
    padding = (pad_width, pad_height, delta_width -
               pad_width, delta_height - pad_height)
    return ImageOps.expand(img, padding)


def resize_with_padding(img, expected_size):
    img.thumbnail((expected_size[0], expected_size[1]))
    delta_width = expected_size[0] - img.size[0]
    delta_height = expected_size[1] - img.size[1]
    pad_width = delta_width // 2
    pad_height = delta_height // 2
    padding = (pad_width, pad_height, delta_width -
               pad_width, delta_height - pad_height)
    return ImageOps.expand(img, padding)


#To convert image to Skeleton
mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

def Img2Skeleton(img):
  with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        
        image = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        image.flags.writeable = False
      
        # Make detection
        results = pose.process(image)
    
        # Recolor back to BGR
        image.flags.writeable = True
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
        #image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
        
        
        plot_img= np.zeros(image.shape, dtype = "uint8")
        # Render detections
        mp_drawing.draw_landmarks(plot_img, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
        plot_img = cv2.resize(plot_img, (224, 224))              
        #plt.imshow(plot_img)
        return plot_img