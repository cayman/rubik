

const additionalChars = /[()]{1}/gi;
const rotationChars = /([yxz]{1}['2]{0,1})/gi;
const stepChars = [
  { pattern: /([yxzUDRLFBMSE]{1}[w]{0,1})2$/,
    '!': '$&2',  // !y2 = y2
    '2': '',      // y2 + y2 = null
    '\'': '$&', // y2 + y' = y
    '': '$&\'', // y2 + y = y'
  },
  { pattern: /([yxzUDRLFBMSE]{1}[w]{0,1})'$/,
    '!': '$&', // !y' = y
    '2': '$&', // y' + y2 = y
    '\'': '$&2', // y' + y' = y2
    '': '', // y' + y = null
  },

  { pattern: /([yxzUDRLFBMSE]{1}[w]{0,1})$/,
    '!': '$&\'', // !y = y'
    '2': '$&\'', // y + y2 = y'
    '\'': '', // y + y' = null
    '': '$&2', // y + y = null
  },
];

// выполнение операции с одиночным шагом кубика
function execOperation (step, name) {
  return stepChars.filter(o => step.match(o.pattern)).map(o => step.replace(o.pattern, o[name]))[0];
}

// очистка пустых шагов и тримминг пробелов
export function trimSteps (steps) {
  return steps.map(step => step.trim()).filter(step => step.length > 0)
}

// разбиение алгоритма на отдельные шаги
function splitSteps(raw) {
  const processed = raw.trim().replace(additionalChars, ' ');
  return trimSteps(processed.split(' '));
}

// разбиение алгоритма на блоки на основе знака разделения блоков sign
function splitBlocks(raw, sign = '|') {
  const processed = raw.trim().replace(rotationChars, '$&' + sign).replace(additionalChars, sign);
  return trimSteps(processed.split(sign));
}

// Блоки выделить скобками
export function parentheses (solution, sign ='  ') {
  return splitBlocks(solution, sign)
    .map(steps => steps.includes(' ') ? '(' + steps + ')' : steps).join(' ');
}

// Распознать блоки выделенные скобками
export function recognize (solution, patterns = []) {
  return splitBlocks(solution, '|')
    .map(steps => patterns.filter(pattern => pattern.alg === steps)
      .map(pattern => pattern.name)[0] || '(' + steps + ')')
    .join(' ');
}

// Инверсия алгоритм (Обратный)
export function revert(solution) {
  return splitSteps(solution).map(step => execOperation(step, '!')).reverse().join(' ');
}

// Добавления поворота к алгоритму
export function turn (solution, move) {
  if (!move || move.length === 0) return solution;
  const steps = splitSteps(solution);
  const lastIndex = steps.length - 1; // последний шаг
  return Math.abs(steps[lastIndex].length - move.length) > 1 || steps[lastIndex][0] !== move[0]
    ? solution + ' ' + move
    : trimSteps(steps.map((step, index) => index < lastIndex ? step : execOperation(step, move[1] || ''))).join(' ');
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
