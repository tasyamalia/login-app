import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD_28-Xo4bpLovJ6gbCuK5oZv3rLD3BhhU",
  authDomain: "exam-loginapp-2301968954.firebaseapp.com",
  projectId: "exam-loginapp-2301968954",
  storageBucket: "exam-loginapp-2301968954.appspot.com",
  messagingSenderId: "278864835002",
  appId: "1:278864835002:web:ebd5ec9cc325b4622f6d83",
  measurementId: "G-8D1GBSWTWY"
};
const Fire = initializeApp(firebaseConfig);
const Auth = getAuth(Fire);
export {Auth}