import Vue from 'vue';

export default {

  loading: (state, name) => {
    state[name].loading = true;
  },
  loaded: (state, name) => {
    state[name].loading = false;
  },

  setMessage: (state, message) => {
    state.message = message;
  },
  setPatterns: (state, list) => {
    Vue.set(state.patterns, 'list', list);
  },
  setGroups: (state, list) => {
    Vue.set(state.groups, 'list', list);
  },
  setGroup: (state, list) => {
    Vue.set(state.group, 'model', list);
  },

  // Случаи
  setCases: (state, list) => {
    Vue.set(state.cases, 'list', list);
  },
  spliceCases: (state, model) => {
    const index = state.cases.list.findIndex(c => c.code === model.code);
    if (index >= 0) {
      state.cases.list.splice(index, 1, model);
    } else {
      state.cases.list.push(model);
    }
  },
  // Случай
  unsetCase: (state) => {
    Vue.set(state.case, 'model', {});
  },
  setCase: (state, model) => {
    Vue.set(state.case, 'model', model);
  },
  setCaseEditing: (state, editing) => {
    Vue.set(state.case, 'editing', editing);
  },
  updateCase: (state, model) => {
    Object.assign(state.case.model, model);
  },

  // Позиции
  setPositions: (state, list) => {
    Vue.set(state.positions, 'list', list);
  },
  splicePositions: (state, model) => {
    const index = state.positions.list.findIndex(position => position.code === model.code);
    if (index >= 0) {
      state.positions.list.splice(index, 1, model);
    } else {
      state.positions.list.push(model);
    }
  },
  // Позиция
  unsetPosition: (state) => {
    Vue.set(state.case, 'position', {});
  },
  setPosition: (state, model) => {
    Vue.set(state.position, 'model', model);
  },
  setPositionEditing: (state, editing) => {
    Vue.set(state.position, 'editing', editing);
  },
  updatePosition: (state, model) => {
    Object.assign(state.position.model, model);
  },

  updateSolution: (state, {index, value}) => {
    const solutions = state.position.model.solutions;
    if (solutions[index]) {
      Object.assign(solutions[index], value)
    }
  },
  addSolution: (state, {index, value}) => {
    const solutions = state.position.model.solutions;
    if (!index) {
      Vue.set(solutions, solutions.length, value);
    } else if(!solutions[index]) {
      Vue.set(solutions, index, value);
    } else {
      solutions.splice(index, 0, value);
    }
  },
  removeSolution: (state, {index}) => {
    const solutions = state.position.model.solutions;
    if (solutions[index]) {
      solutions.splice(index, 1);
    }
  },
  moveForwardSolution: (state, {index}) => {
    const solutions = state.position.model.solutions;
    if (solutions[index] && index < solutions.length - 1) {
      solutions.splice(index + 1, 0, solutions.splice(index, 1)[0]);
    }
  },
  moveBackSolution: (state, {index}) => {
    const solutions = state.position.model.solutions;
    if (solutions[index] && index > 0) {
      solutions.splice(index - 1, 0, solutions.splice(index, 1)[0]);
    }
  },
};
