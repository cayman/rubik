import {clearModel, getSnapData, getSnapList, parseError} from '../../util';

export default {

  // Случаи
  fetchCases: ({commit, getters}, groupCode) => {
    console.log('fetchCases:' + groupCode);
    commit('loading', 'cases');
    return getters.cases.where('groupCode', '==', groupCode).get()
      .then(list => getSnapList(list)
        .sort((a, b) => a.number > b.number ? 1 : -1)
      )
      .then(list => {
        commit('setCases', list);
        commit('loaded', 'cases');
        return list;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка загрузки случаев:', error));
        commit('loaded', 'cases');
      });
  },

  // Случай
  fetchCase: ({commit, getters}, id) => {
    console.log('fetchCase:' + id);
    commit('loading', 'case');
    return getters.cases.doc(id).get()
      .then(model => getSnapData(model))
      .then(model => {
        commit('setCase', model);
        commit('loaded', 'case');
        return model;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка загрузки случая:', error));
        commit('loaded', 'case');
      });
  },

  newCase: ({commit}, {group, part, lastCase}) => {
    console.log('newCase:', group.code, part.code);
    const model = {
      groupCode : group.code,
      partCode: part.code,
      projectionCode: lastCase.projectionCode || null,
      id: null,
      code: null,
      number: lastCase.number + 1,
      name: lastCase.name || null,
      desc: lastCase.desc || null,
      setup: null,
      arrows: lastCase.arrows || null
    };
    commit('setCase', model);
    commit('setCaseEditing', true);
    return model;
  },

  editCase: ({commit}, caseModel) => {
    console.log('editCase:', caseModel);
    const model = {
      ...caseModel,
      setup: caseModel.setup || null,
      arrows: caseModel.arrows || null
    };
    commit('setCase', model);
    commit('setCaseEditing', true);
    return model;
  },

  saveCase: ({commit, getters}, caseModel) => {
    if (!caseModel.code) {
      commit('updateCase', {code: caseModel.groupCode + '-' + caseModel.number});
    }
    const id = caseModel.id || caseModel.code;
    console.log('saveCase:', id, caseModel);
    commit('loading', 'case');
    commit('loading', 'cases');
    return getters.cases.doc(id).set(clearModel(caseModel))
      .then(() => getters.cases.doc(id).get())
      .then(model => getSnapData(model))
      .then(model => {
        commit('unsetCase');
        commit('setCaseEditing', false);
        commit('loaded', 'case');
        commit('spliceCases', model);
        commit('loaded', 'cases');
        return id;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка сохранения случая:', error));
        commit('loaded', 'case');
        commit('loaded', 'cases');
      });
  }

}
