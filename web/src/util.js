
const pare1 = { from: /([URFLDBMurfldbyxz]{1}[w]{0,1})'/i, to:'$1' };
const pare2 = { from: /([URFLDBMurfldbyxz]{1}[w]{0,1}2)/i, to:'$1' };
const pare3 = { from: /([URFLDBMurfldbyxz]{1}[w]{0,1})/i, to:'$1\'' };

const clearing1 = /[(]{1}/gi;
const clearing2 = /[)]{1}/gi;

function splitSteps(steps) {
  return steps.trim().replace(clearing1,' ').replace(clearing2,' ')
    .split(' ').map(steps => steps.trim()).filter(steps => steps.length > 0);
}

function splitBlocks(steps) {
  return steps.trim().replace(clearing1,'|').replace(clearing2,'|')
    .split('|').map(steps => steps.trim()).filter(steps => steps.length > 0);
}

export function revert(steps) {
  return splitSteps(steps)
    .map(step =>
      step.match(pare1.from) ? step.replace(pare1.from, pare1.to) :
      step.match(pare2.from) ? step.replace(pare2.from, pare2.to) :
      step.match(pare3.from) ? step.replace(pare3.from, pare3.to) : 'X').reverse().join(' ');
}


export function recognize (solution, patterns = []) {
  return splitBlocks(solution)
    .map(steps => patterns.filter(pattern => pattern.alg === steps)
      .map(pattern => pattern.name)[0] || '(' + steps + ')')
    .join(' ');
}
