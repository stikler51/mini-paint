import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import firebaseApp from './firebase';
import store from '../store/store';
import { login, logout, setError } from '../store/userSlice';
import { startLoading, stopLoading } from '../store/loadingSlice';

firebaseApp();

export const auth = getAuth();

// Changing redux user state on every login/logout event
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('sign in from listener', user);
    store.dispatch(stopLoading());
    store.dispatch(login({
      uid: user.uid,
      email: user.email,
      accessToken: user.accessToken
    }));
    // Saving loggedIn state in session storage because of
    // when user is authorized and page is reloading,
    // /editor page redirects to /signin page
    sessionStorage.setItem('mini-paint-loggedIn', true);
    store.dispatch(setError(null));
    console.log(store.getState());
    return;
  }
  console.log('sign out from listener');
  sessionStorage.setItem('mini-paint-loggedIn', false);
  store.dispatch(stopLoading());
  store.dispatch(logout());
  store.dispatch(setError(null));
  console.log(store.getState());
});

export const authorizeUser = (email, password) => {
  store.dispatch(startLoading());
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      sessionStorage.setItem('mini-paint-loggedIn', true);
    })
    .catch((error) => {
      store.dispatch(setError(error.message));
      store.dispatch(stopLoading());
    });
};

export const registerUser = (email, password) => {
  store.dispatch(startLoading());
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      sessionStorage.setItem('mini-paint-loggedIn', true);
    })
    .catch((error) => {
      store.dispatch(stopLoading());
      store.dispatch(setError(error.message));
    });
};

export const signOutUser = () => {
  store.dispatch(startLoading());
  sessionStorage.setItem('mini-paint-loggedIn', false);
  signOut(auth).then(() => {
    console.log('Sign-out successful.');
  }).catch((error) => {
    store.dispatch(stopLoading());
    console.log(error.message);
  });
};
