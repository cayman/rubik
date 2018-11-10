
const pare1 = { from: /([URFLDBMurfldbyxz]{1}[w]{0,1})'/i, to:'$1' };
const pare2 = { from: /([URFLDBMurfldbyxz]{1}[w]{0,1}2)/i, to:'$1' };
const pare3 = { from: /([URFLDBMurfldbyxz]{1}[w]{0,1})/i, to:'$1\'' };
const clearing = /[*]{1}/i;
const clearing1 = /[(]{1}/i;
const clearing2 = /[)]{1}/i;

export function revert(steps) {
  return steps.trim().split(' ').map(step => step.replace(clearing,'').replace(clearing1,'').replace(clearing2,''))
    .map(step => step.match(pare1.from) ? step.replace(pare1.from, pare1.to) :
      step.match(pare2.from) ? step.replace(pare2.from, pare2.to) :
        step.match(pare3.from) ? step.replace(pare3.from, pare3.to) :
          'X').reverse().join(' ');
}
