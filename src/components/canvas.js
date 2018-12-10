import React from 'react';
import speach from '../audio/speach.mp3';

const w = 600;
const h = 200;

const getAudioBuffer = (audioCtx, url) => {
  return fetch(url)
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => audioCtx.decodeAudioData(arrayBuffer));
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

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  //eslint-disable-next-line
  shouldCompomentUpdate() {
    return false;
  }

  componentDidMount() {
    const canvasContext = this.ref.current.getContext('2d');
    canvasContext.canvas.width = w;
    canvasContext.canvas.height = h;
    canvasContext.strokeStyle = 'rgb(0,0,0)';
    canvasContext.fillStyle = 'rgb(255,255,255)';
    canvasContext.lineWidth = 0.5;

    const draw = (analyser) => {
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);
      canvasContext.clearRect(0, 0, w, h);
      canvasContext.beginPath();

      const angleStep = 2 * Math.PI / bufferLength;
      const R = 10;
      const circleCenter = {
        x: w / 2,
        y: h / 2 - 30
      };

      for (let i = 0; i < bufferLength; i++) {
        //reflect in the middle
        const index = i < bufferLength / 2 ? i : bufferLength - i;
        const v = dataArray[index] * 0.5;
        const x = circleCenter.x + Math.sin(angleStep * i) * (R + v);
        const y = circleCenter.y + Math.cos(angleStep * i) * (R + v);
        canvasContext.moveTo(circleCenter.x, circleCenter.y);
        canvasContext.lineTo(x, y);
      }

      canvasContext.stroke();
      requestAnimationFrame(() => draw(analyser));
    };

    const audioContext = new AudioContext();
    getAudioBuffer(audioContext, speach)
    .then(buffer => {
      const {analyser} = setUpAudio(audioContext, buffer);
      draw(analyser);
    });
  }

  render() {
    return <canvas
      ref={this.ref}
      id="main-canvas"
    />;
  }
}

export default Canvas;
