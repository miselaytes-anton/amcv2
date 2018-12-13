from __future__ import division
from scipy.fftpack import fft
from scipy.io import wavfile
import json
import numpy as np
import math
import sys
import matplotlib.pyplot as plt

def split(x, fs, fftSize, framesPerSecond=60):
    chunkLength = fs // framesPerSecond
    chunkableLen = len(x)//chunkLength * chunkLength
    xChunkable = x[:chunkableLen]
    chunks = np.array(np.split(xChunkable, chunkableLen/chunkLength))
    return np.array([chunk[-fftSize:] for chunk in chunks])

def windowedFFT(x, fs, fftSize):
    window = np.blackman(fftSize)
    y = fft(x * window, fftSize)
    return np.abs(y[:len(y)//2 - 1])

def smoothen(ffts, smoothConstant = 0.9):
    zeros = np.zeros(len(ffts[0]))
    smoothed = np.empty(shape=ffts.shape)
    for i, curr in enumerate(ffts):
        prev = zeros if i == 0 else smoothed[i -1]
        smoothed[i] = smoothConstant * prev + (1 - smoothConstant) * curr
    return smoothed

def toDb(v):
    eps = np.finfo(np.float64).eps
    return 20*np.log10((v + eps)/ eps)

def mapRange(fromRange, toRange, number):
    return (number - fromRange[0]) * (toRange[1] - toRange[0]) / (fromRange[1] - fromRange[0]) + toRange[0]

def scale(v, minValue, maxValue):
    return np.uint8(mapRange([minValue, maxValue], [0,255], v))

WAV_FILE = sys.argv[1]
JSON_FILE = sys.argv[2]
FFT_SIZE = 256

fs, x = wavfile.read(WAV_FILE)
chunks = split(x, fs, FFT_SIZE)
ffts = np.array([windowedFFT(chunk, fs, FFT_SIZE) for chunk in chunks])
fftsSmooth = smoothen(ffts)
fftsInDb = np.array([np.vectorize(toDb)(fftItem) for fftItem in fftsSmooth])
fftsScaled = np.array([np.vectorize(scale)(fftItem, np.min(fftsInDb), np.max(fftsInDb)) for fftItem in fftsInDb])
# plt.plot(fftsScaled[0], 'r')
# plt.show()
with open(JSON_FILE, 'w') as outfile:
    json.dump([fftItem.tolist() for fftItem in fftsScaled], outfile)

# https://dsp.stackexchange.com/questions/32076/fft-to-spectrum-in-decibel
# https://webaudio.github.io/web-audio-api/#blackman-window
# https://en.wikipedia.org/wiki/List_of_mathematical_symbols#Letter_modifiers
# https://stackoverflow.com/questions/23377665/python-scipy-fft-wav-files
# https://www.gaussianwaves.com/2015/11/interpreting-fft-results-complex-dft-frequency-bins-and-fftshift/
# https://dsp.stackexchange.com/questions/32076/fft-to-spectrum-in-decibel
# https://groups.google.com/forum/#!topic/comp.dsp/cZsS1ftN5oI
