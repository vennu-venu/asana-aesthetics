from keras.models import load_model
from keras.preprocessing import image
import numpy as np

model = load_model('ResnetModel5.h5')

def classify(img):
    return np.argmax(model.predict(np.array([img])))