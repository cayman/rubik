import {clearModel, getSnapData, getSnapList, parseError} from '../../util';

export default {

  fetchParts: ({commit, getters}, groupCode) => {
    console.log('fetchParts:' + groupCode);
    commit('loading', 'parts');
    return getters.parts.where('groupCode', '==', groupCode).get()
      .then(list => getSnapList(list)
        .sort((a, b) => a.code > b.code ? 1 : -1)
      )
      .then(list => {
        commit('setParts', list);
        commit('loaded', 'parts');
        return list;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка загрузки групп:', error));
        commit('loaded', 'parts');
      });
  },

  newPart: ({commit}, {group, number}) => {
    console.log('newPart:', group.code);
    const model = {
      id: null,
      groupCode: group.code,
      code: null,
      number,
      name: null,
      desc: null
    };
    commit('setPart', model);
    commit('setPartEditing', true);
    return model;
  },

  editPart: ({commit}, part) => {
    console.log('editPart:', part);
    const model = {...part};
    commit('setPart', model);
    commit('setPartEditing', true);
    return model;
  },

  savePart: ({commit, getters}, part) => {
    if (!part.code) {
      commit('updatePart', {code: part.groupCode + ':' + part.number});
    }
    const id = part.id || part.code;
    console.log('savePart:', id, part);
    commit('loading', 'part');
    commit('loading', 'parts');
    return getters.parts.doc(id).set(clearModel(part))
      .then(() => getters.parts.doc(id).get())
      .then(model => getSnapData(model))
      .then(model => {
        commit('unsetPart');
        commit('setPartEditing', false);
        commit('loaded', 'part');
        commit('spliceParts', model);
        commit('loaded', 'parts');
        return id;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка сохранения группы:', error));
        commit('loaded', 'part');
        commit('loaded', 'parts');
      });
  },

  exportParts:({dispatch}, group) => {
    console.log('exportParts:', group.code, group.parts.length);
    group.parts.map(part => ({...part, groupCode: group.code, number: part.code, code: group.code + ':' + part.code}))
      .forEach(part => dispatch('savePart', part))
  }


}
