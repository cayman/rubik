import {clearModel, filterSteps, getSnapData, getSnapList, parseError, sortAlg} from "../../util";

export default {

  // Шаблоны
  fetchPatterns: ({commit, getters}) => {
    console.log('fetchPatterns:');
    commit('loading', 'patterns');
    return getters.patterns.get()
      .then(list => getSnapList(list)
        .filter(p => p.alg && p.alg.length > 0)
        .sort((a,b) => sortAlg(a.alg, b.alg, 1))
      )
      .then(list => {
        commit('setPatterns', list);
        commit('loaded', 'patterns');
        return list;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка загрузки шаблонов:', error));
        commit('loaded', 'patterns');
      });
  },

  newPattern: ({commit}, {group}) => {
    console.log('newPattern', group);
    const model = {
      id: null,
      alg: null,
      group,
      name: null,
      desc: null
    };
    commit('setPattern', model);
    commit('setPatternEditing', true);
    return model;
  },

  editPattern: ({commit}, pattern) => {
    console.log('editPattern:', pattern);
    const model = {...pattern};
    commit('setPattern', model);
    commit('setPatternEditing', true);
    return model;
  },

  savePattern: ({commit, getters}, pattern) => {
    const id = pattern.id || filterSteps(pattern.alg.split(' ')).join('');
    console.log('savePattern:', id, pattern);
    commit('loading', 'pattern');
    commit('loading', 'patterns');
    return getters.patterns.doc(id).set(clearModel(pattern))
      .then(() => getters.patterns.doc(id).get())
      .then(model => getSnapData(model))
      .then(model => {
        commit('unsetPattern');
        commit('setPatternEditing', false);
        commit('loaded', 'pattern');
        commit('splicePatterns', model);
        commit('loaded', 'patterns');
        return id;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка сохранения шаблонов:', error));
        commit('loaded', 'patterns');
        commit('loaded', 'pattern');
      });
  }

}
