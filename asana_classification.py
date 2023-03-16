from keras.models import load_model
from keras.preprocessing import image
import numpy as np

model = load_model('asana-classifier.h5')

def classify(img):
    return np.argmax(model.predict(img.reshape(1, 224 * 224)))