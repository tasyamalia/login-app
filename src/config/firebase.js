import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyD_28-Xo4bpLovJ6gbCuK5oZv3rLD3BhhU",
  authDomain: "exam-loginapp-2301968954.firebaseapp.com",
  projectId: "exam-loginapp-2301968954",
  storageBucket: "exam-loginapp-2301968954.appspot.com",
  messagingSenderId: "278864835002",
  appId: "1:278864835002:web:ebd5ec9cc325b4622f6d83",
  measurementId: "G-8D1GBSWTWY",
  databaseURL:
    'exam-loginapp-2301968954-default-rtdb.asia-southeast1.firebasedatabase.app',
};
const Fire = initializeApp(firebaseConfig);
const Auth = getAuth(Fire);
const RealDatabase = getDatabase(Fire);
export {Auth, RealDatabase}