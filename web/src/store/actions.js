import groups from './actions/groups';
import parts from './actions/parts';
import cases from './actions/cases';
import patterns from './actions/patterns';
import positions from './actions/positions';

const actions = Object.assign({}, groups, parts, cases, patterns, positions);

export default actions;
