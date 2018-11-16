
const pare1 = { from: /([URFLDBMurfldbyxz]{1}[w]{0,1})'/i, to:'$1' };
const pare2 = { from: /([URFLDBMurfldbyxz]{1}[w]{0,1}2)/i, to:'$1' };
const pare3 = { from: /([URFLDBMurfldbyxz]{1}[w]{0,1})/i, to:'$1\'' };

const clearing1 = /[(]{1}/gi;
const clearing2 = /[)]{1}/gi;
const turn = /([yxz]{1}['2]{0,1})/gi;

export function filterSteps (steps) {
  return steps.map(step => step.trim()).filter(step => step.length > 0)
}

function splitSteps(raw) {
  const processed = raw.trim().replace(clearing1,' ').replace(clearing2,' ');
  return filterSteps(processed.split(' '));
}

function splitBlocks(raw) {
  const processed = raw.trim().replace(turn,'$1|').replace(clearing1,'|').replace(clearing2,'|');
  return filterSteps(processed.split('|'));
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

export function sortAlg (a, b, order = 1) {
  const sa = a.split(' ');
  const sb = b.split(' ');
  return sa[0] > sb[0] ? 1 : sa[0] < sb[0] ? -1
    : sa.length < sb.length ? order : sa.length < sb.length ? (-1 * order)
    : a.length < b.length ? order : (-1 * order);
}

export function parseError(title, error) {
  console.log(title, error);
  return { type: 'error', title, error };
}

function createModel(snap) {
  return {id: snap.id, ...snap.data()};
}

export function clearModel(model) {
  const _model = Object.assign({}, model);
  delete _model.id;
  return _model;
}

export function getSnapList (snap) {
  return snap.docs.map(item => createModel(item));
}

export function getSnapData (snap) {
  return snap.exists ? createModel(snap) : {};
}
