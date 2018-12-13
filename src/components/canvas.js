import React from 'react';
import speach from '../audio/speach.mp3';
import frames from '../audio/fft-data.json';

const sum = arr => arr.reduce((sum, v) => sum + v, 0);
const avg = arr => sum(arr) / arr.length;
const getAudioBuffer = (audioCtx, url) => {
  return fetch(url)
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => new Promise((res, rej) => audioCtx.decodeAudioData(arrayBuffer, res, rej)));
};
const getAvgValue = (frames, frameIndex, valueIndex, num) => frameIndex > num
  ? avg(frames.slice(frameIndex - num, frameIndex).map(frame => frame[valueIndex]))
  : avg(frames.slice(0, frameIndex).concat(frames.slice(frames.length - frameIndex, frames.length)).map(frame => frame[valueIndex]));

const getAudioContext = () => {
  //eslint-disable-next-line
  if (typeof window !== `undefined`){
    const Ctx = window.AudioContext || window.webkitAudioContext;
    return Ctx ? new Ctx() : null;
  }
  return null;
};

const setUpAudio = (audioContext, buffer) => {
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;

  const delay = audioContext.createDelay(5.0);
  delay.delayTime.value = 0.5;
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  source.start();
  const feedback = audioContext.createGain();
  feedback.gain.value = 0.2;
  source.connect(delay);
  delay.connect(analyser);
  delay.connect(feedback);
  feedback.connect(delay);
  source.connect(analyser);
  // disable audio input
  //analyser.connect(audioContext.destination);
  return {analyser};
};
const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));
const randomColor = () => `rgb(${getRandomInt(255)},${getRandomInt(255)},${getRandomInt(255)})`;

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.colors = false;
    this.audioContext = getAudioContext();
  }

  //eslint-disable-next-line
  shouldComponentUpdate() {
    return false;
  }
  makeColors = () => {
    this.colors = !this.colors;
  };

  componentDidMount() {
    if(!this.audioContext) {
      return;
    }
    const w = window.innerWidth;
    const h = 200;
    const canvasContext = this.ref.current.getContext('2d');
    canvasContext.canvas.width = w;
    canvasContext.canvas.height = h;
    canvasContext.fillStyle = 'rgba(255,255,255, 1)';
    canvasContext.lineWidth = 0.5;
    let frameIndex = 0;
    const numFrames = frames.length;
    const draw = (analyser) => {

      // const bufferLength = analyser.frequencyBinCount;
      // const dataArray = new Uint8Array(bufferLength);
      // analyser.getByteFrequencyData(dataArray);

      const bufferLength = frames[frameIndex].length;
      frameIndex++;
      if (frameIndex === numFrames - 1) {
        frameIndex = 0;
      }

      canvasContext.fillRect(0, 0, w, h);
      canvasContext.strokeStyle = this.colors ? randomColor() : 'rgb(0,0,0)';
      canvasContext.beginPath();

      const angleStep = 2 * Math.PI / bufferLength;
      const R = 10;
      const circleCenter = {
        x: w / 2,
        y: h / 2 - 60
      };

      for (let i = 0; i < bufferLength; i++) {
        //reflect in the middle
        const index = i < bufferLength / 2 ? i : bufferLength - i;
        const v = frames[frameIndex][index];
        const x = circleCenter.x + Math.sin(angleStep * i) * (R + v);
        const y = circleCenter.y + Math.cos(angleStep * i) * (R + v);
        canvasContext.moveTo(circleCenter.x, circleCenter.y);
        canvasContext.lineTo(x, y);
      }

      canvasContext.stroke();
      requestAnimationFrame(() => draw(analyser));
    };

    getAudioBuffer(this.audioContext, speach)
    .then(buffer => {
      const {analyser} = setUpAudio(this.audioContext, buffer);
      draw(analyser);
    });
  }

  render() {
    return this.audioContext ? <canvas
      style={{cursor: 'pointer'}}
      ref={this.ref}
      id="main-canvas"
      onClick={this.makeColors}
    /> : '';
  }
}

export default Canvas;
