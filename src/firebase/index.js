import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import store from '../store/store';
import { login, logout } from '../store/userSlice';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_API_ID
};

initializeApp(firebaseConfig);

export const auth = getAuth();

// Changing redux user state on every login/logout event
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('sign in from listener', user);
    store.dispatch(login({
      uid: user.uid,
      email: user.email,
      accessToken: user.accessToken
    }));
    return;
  }
  console.log('sign out from listener');
  store.dispatch(logout());
});

export const authorizeUser = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const { user } = userCredential;
      console.log('login', user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};

export const registerUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const { user } = userCredential;
      console.log('register', user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};

export const signOutUser = () => {
  signOut(auth).then(() => {
    console.log('Sign-out successful.');
  }).catch((error) => {
    console.log(error);
  });
};
