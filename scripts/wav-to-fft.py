#!/usr/bin/env python

from __future__ import division
import matplotlib.pyplot as plt
from scipy.fftpack import fft
from scipy.io import wavfile
import json
import numpy as np
import math
import sys

flatten = lambda l: [item for sublist in l for item in sublist]
def mapRange(fromRange, toRange, number):
    return (number - fromRange[0]) * (toRange[1] - toRange[0]) / (fromRange[1] - fromRange[0]) + toRange[0]

fs, data = wavfile.read(sys.argv[1])

# fftLength >= numSamples in signal, and also a power of 2
# e.g. if numSamples=123, then fftLength = 128
FFT_SIZE=256
numChunks = math.floor(len(data)/FFT_SIZE)
chunks = np.array_split(data[:len(data) - len(data)%numChunks], numChunks)
ffts = map(lambda chunk : fft(chunk, FFT_SIZE), chunks)
# take the real part
frames = map(lambda frame : abs(frame[:(len(frame)/2-1)]).tolist(), ffts)
minValue = min(flatten(frames))
maxValue = max(flatten(frames))
mapToUint8 = lambda v: int(mapRange([minValue, maxValue], [0,255], v))
values = map(lambda frame : map(mapToUint8, frame), frames)
with open(sys.argv[2], 'w') as outfile:
    json.dump(values, outfile)
