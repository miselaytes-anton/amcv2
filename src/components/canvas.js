import React from 'react';
import frames from '../audio/fft-data.json';

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));
const randomColor = () => `rgb(${getRandomInt(255)},${getRandomInt(255)},${getRandomInt(255)})`;

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.colors = false;
  }

  //eslint-disable-next-line
  shouldComponentUpdate() {
    return false;
  }
  makeColors = () => {
    this.colors = !this.colors;
  };

  componentDidMount() {
    const w = window.innerWidth;
    const h = 200;
    const canvasContext = this.ref.current.getContext('2d');
    canvasContext.canvas.width = w;
    canvasContext.canvas.height = h;
    canvasContext.fillStyle = 'rgba(255,255,255, 1)';
    canvasContext.lineWidth = 0.5;
    let frameIndex = 0;
    const numFrames = frames.length;
    const draw = () => {
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
        y: h / 2 - 25
      };

      for (let i = 0; i < bufferLength; i++) {
        //reflect in the middle
        const index = i < bufferLength / 2 ? i : bufferLength - i;
        //take every even bar
        const v = frames[frameIndex][index * 2] * 0.5;
        const x = circleCenter.x + Math.sin(angleStep * i) * (R + v);
        const y = circleCenter.y + Math.cos(angleStep * i) * (R + v);
        canvasContext.moveTo(circleCenter.x, circleCenter.y);
        canvasContext.lineTo(x, y);
      }

      canvasContext.stroke();
      requestAnimationFrame(() => draw());
    };
    draw();
  }

  render() {
    return <canvas
      style={{cursor: 'pointer'}}
      ref={this.ref}
      id="main-canvas"
      onClick={this.makeColors}
    />;
  }
}

export default Canvas;
