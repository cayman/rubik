import {clearModel, getSnapData, getSnapList, parseError, turn} from '../../util';


function newPositionCode ({code}, {turn}, rotation) {
  return code + (turn ? '_' + turn : '') + (rotation ? '_' + rotation : '');
}

export default {

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

  newPosition: ({commit}, {caseModel, projection, rotation, setup, arrows}) => {
    const code = newPositionCode(caseModel, projection, rotation);
    console.log('newPosition:', code);
    const model = {
      id: null,
      code,
      groupCode: caseModel.groupCode,
      caseCode: caseModel.code,
      projectionCode: projection.code,
      rotation,
      setup: setup && rotation ? turn(setup, rotation): setup || null,
      arrows: arrows || null,
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
    const model = {
      ...position,
      solutions,
      setup: position.setup || null,
      arrows: position.arrows || null
    };
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
