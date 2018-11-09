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

  setCases: (state, list) => {
    Vue.set(state.cases, 'list', list);
  },
  setPositions: (state, list) => {
    Vue.set(state.positions, 'list', list);
  },
  setCase: (state, model) => {
    Vue.set(state.case, 'model', model);
  },
  setPosition: (state, model) => {
    Vue.set(state.position, 'model', model);
  },
};
