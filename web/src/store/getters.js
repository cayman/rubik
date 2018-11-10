import {db} from './firebase';

export default {
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
