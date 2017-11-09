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

module.exports.colors = colors;
module.exports.randomInt = randomInt;
