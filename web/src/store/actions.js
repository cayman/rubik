export function parseError(title, error) {
  console.log(title, error);
  return { type: 'error', title, error };
}

function createModel(snap) {
  return {id: snap.id, ...snap.data()};
}

export function getSnapList (snap) {
  return snap.docs.map(item => createModel(item));
}

export function getSnapData (snap) {
  return snap.exists ? createModel(snap) : {};
}


export default {

  // Случаи
  fetchCases: ({commit, getters}, groupCode) => {
    console.log('fetchCases:' + groupCode);
    commit('loading', 'cases');
    return getters.cases.where('groupCode', '==', groupCode).get()
      .then(list => getSnapList(list)
        .sort((a, b) => a.code > b.code ? -1 : 1)
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

  // Позиции
  fetchPositions: ({commit, getters}, caseCode) => {
    console.log('fetchPositions:' + caseCode);
    commit('loading', 'positions');
    return getters.positions.where('caseCode', '==', caseCode).get()
      .then(list => getSnapList(list)
        .sort((a, b) => a.code > b.code ? -1 : 1)
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

}
