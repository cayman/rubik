import {getSnapData, getSnapList, parseError} from '../../util';

export default {

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
  }

}
