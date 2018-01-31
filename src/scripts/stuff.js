const colors = [
  '#0074D9',
  '#FF4136',
  '#2ECC40',
  '#FFDC00',
  '#7FDBFF',
  '#F012BE',
  '#01FF70',
  '#FF851B',
  '#39CCCC',
  '#B10DC9',
  '#DDDDDD',
  '#AAAAAA',
];

function randomInt(min, max) {
  return Math.floor(min + (1 + max - min) * Math.random());
}

function animate({ timing, draw, duration }) {
  const start = performance.now();
  // eslint-disable-next-line
  requestAnimationFrame(function animate(time) {
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;
    // calculate the current animation state
    const progress = (timing) ? timing(timeFraction) : timeFraction;
    // draw it
    draw(progress);
    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
} // end animate

function timingLinear(timeFraction) {
  return timeFraction;
}

module.exports.colors = colors;
module.exports.randomInt = randomInt;
module.exports.animate = animate;
module.exports.timingLinear = timingLinear;
