#!/usr/bin/env bash

#play --help-effect reverb

TMP_WAV_FILE=tmp.wav 
TMP_WAV_PROCESSED_FILE=tmp.processed.wav 
OUTPUT_JSON_FILE=./src/audio/fft-data.json
TEXT="Hi! I'm Anton, a web developer. Lately I do a lot of music & audio related projects."

echo $TEXT | espeak --stdin -w $TMP_WAV_FILE 
sox $TMP_WAV_FILE $TMP_WAV_PROCESSED_FILE reverb reverb reverb
./scripts/wav-to-fft.py $TMP_WAV_PROCESSED_FILE $OUTPUT_JSON_FILE
rm -rf $TMP_WAV_FILE
rm -rf $TMP_WAV_PROCESSED_FILE
