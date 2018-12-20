#!/usr/bin/env bash
set -e
TMP_WAV_FILE=tmp.wav 
TMP_WAV_PROCESSED_FILE=tmp.processed.wav 
OUTPUT_JSON_FILE=./src/audio/fft-data.json
OUTPUT_MP3_FILE=./src/audio/speech.mp3
TEXT="Hi! I'm Anton, a web developer. Lately I do a lot of music & audio related projects. You can check my code at GitHub and read some of my articles at Medium."

echo $TEXT | espeak --stdin -w $TMP_WAV_FILE 
sox $TMP_WAV_FILE $TMP_WAV_PROCESSED_FILE reverb
python3 ./scripts/wav-to-fft.py $TMP_WAV_PROCESSED_FILE $OUTPUT_JSON_FILE
rm -rf $OUTPUT_MP3_FILE
ffmpeg -i $TMP_WAV_PROCESSED_FILE -ar 44100 -ac 2 -ab 192k -f mp3 $OUTPUT_MP3_FILE
rm -rf $TMP_WAV_FILE
rm -rf $TMP_WAV_PROCESSED_FILE
