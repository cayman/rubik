import {clearModel, filterSteps, getSnapData, getSnapList, parseError, sortAlgs} from '../util';

export default {

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
  },


  // Случаи
  fetchPatterns: ({commit, getters}) => {
    console.log('fetchPatterns:');
    commit('loading', 'patterns');
    return getters.patterns.get()
      .then(list => getSnapList(list)
        .filter(p => p.alg && p.alg.length > 0)
        .sort(sortAlgs)
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
  // Случаи
  fetchGroups: ({commit, getters}) => {
    console.log('fetchGroups:');
    commit('loading', 'groups');
    return getters.groups.get()
      .then(list => getSnapList(list)
        .sort((a, b) => a.code > b.code ? -1 : 1)
      )
      .then(list => {
        commit('setGroups', list);
        commit('loaded', 'groups');
        return list;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка загрузки групп:', error));
        commit('loaded', 'groups');
      });
  },

  // Случай
  fetchGroup: ({commit, getters}, id) => {
    console.log('fetchGroup:' + id);
    commit('loading', 'group');
    return getters.groups.doc(id).get()
      .then(model => getSnapData(model))
      .then(model => {
        commit('setGroup', model);
        commit('loaded', 'group');
        return model;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка загрузки группы:', error));
        commit('loaded', 'group');
      });
  },

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

  newCase: ({commit}, {lastCase, group, part}) => {
    console.log('newCase:', group.code);
    const model = {
      id: null,
      code: null,
      groupCode : group.code,
      number: lastCase.number + 1,
      name: lastCase.name || null,
      desc: lastCase.desc || null,
      projectionCode: lastCase.projectionCode || null,
      partCode: part.code,
      setup: null
    };
    commit('setCase', model);
    commit('setCaseEditing', true);
    return model;
  },

  editCase: ({commit}, caseModel) => {
    console.log('editCase:', caseModel);
    const model = {...caseModel};
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
  },

  // Позиции
  fetchPositions: ({commit, getters}, params) => {
    console.log('fetchPositions:', params);
    commit('loading', 'positions');
    const pair = Object.entries(params)[0];
    return getters.positions.where(pair[0], '==', pair[1]).get()
      .then(list => getSnapList(list)
        .sort((a, b) => a.code > b.code ? 1 : -1)
      )
      .then(list => {
        commit('setPositions', list);
        commit('loaded', 'positions');
        return list;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка загрузки позиций:', error));
        commit('loaded', 'positions');
      });
  },

  newPosition: ({commit}, {caseModel, projection, rotation, setup}) => {
    const code = caseModel.code +
      (projection.turn ? '_' + projection.turn : '') +
      (rotation ? '_' + rotation : '');
    console.log('newPosition:', code);
    const model = {
      id: null,
      groupCode: caseModel.groupCode,
      caseCode: caseModel.code,
      projectionCode: projection.code,
      rotation,
      code,
      setup: setup && rotation ? setup + ' ' + rotation : setup,
      solutions: [{alg: null, note: null, selected: false, key: null}]
    };
    commit('setPosition', model);
    commit('setPositionEditing', true);
    return model;
  },

  editPosition: ({commit}, position) => {
    console.log('editPosition:', position);
    const solutions = position.solutions.length > 0
      ? position.solutions : [{alg: null, note: null, key: null}];
    const model = {...position, solutions};
    commit('setPosition', model);
    commit('setPositionEditing', true);
    return model;
  },

  savePosition: ({commit, getters}, position) => {
    const id = position.id || position.code;
    console.log('savePosition:', id, position);
    commit('loading', 'position');
    commit('loading', 'positions');
    return getters.positions.doc(id).set(clearModel(position))
      .then(() => getters.positions.doc(id).get())
      .then(model => getSnapData(model))
      .then(model => {
        commit('unsetPosition');
        commit('setPositionEditing', false);
        commit('loaded', 'position');
        commit('splicePositions', model);
        commit('loaded', 'positions');
        return id;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка сохранения позиции:', error));
        commit('loaded', 'position');
        commit('loaded', 'positions');
      });
  },

}
