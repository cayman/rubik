import {db} from './firebase';

export default {
  cases () {
    return db.collection('cases');
  },
  positions () {
    return db.collection('positions');
  }
};
