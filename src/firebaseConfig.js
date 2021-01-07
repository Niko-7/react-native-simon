import * as firebase from 'firebase';

import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAOQV5yYDPzufMrk08HSCt_tu4W4QkSyDA',
  authDomain: 'fir-reactnative-simon.firebaseapp.com',
  projectId: 'fir-reactnative-simon',
  storageBucket: 'fir-reactnative-simon.appspot.com',
  messagingSenderId: '836249636731',
  appId: '1:836249636731:web:371375558b32d8bdfa77de',
  measurementId: 'G-5X8QCWZWVS',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
