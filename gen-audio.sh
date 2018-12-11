#!/usr/bin/env bash

OUTPUT_FILE=./src/audio/speach.mp3
TEXT="Hi! I'm Anton, a web developer. Lately I do a lot of music & audio related projects. You can check my code at GitHub and read some of my web audio articles at Medium"
rm -rf $OUTPUT_FILE
echo $TEXT | espeak --stdin --stdout | ffmpeg -i - -ar 44100 -ac 2 -ab 192k -f mp3 $OUTPUT_FILE