import {db} from './firebase';

export default {
  patterns () {
    return db.collection('algs');
  },
  groups () {
    return db.collection('groups');
  },
  parts () {
    return db.collection('parts');
  },
  cases () {
    return db.collection('cases');
  },
  positions () {
    return db.collection('positions');
  }
};
