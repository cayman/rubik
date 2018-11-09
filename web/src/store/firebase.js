import config from  '../config';
import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp(config.firebase);

const db = firebase.firestore();

console.log(firebase.name);

export { db };
