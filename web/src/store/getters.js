import {db} from './firebase';

export default {
  patterns () {
    return db.collection('algs');
  },
  groups () {
    return db.collection('groups');
  },
  cases () {
    return db.collection('cases');
  },
  positions () {
    return db.collection('positions');
  }
};
