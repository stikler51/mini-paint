import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from './firebase';
import store from '../store/store';
import { login, logout, setError } from '../store/userSlice';
import { startLoading, stopLoading } from '../store/loadingSlice';
import { saveUser } from './db';

// Changing redux user state on every login/logout event
onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(stopLoading());
    store.dispatch(login({
      uid: user.uid,
      email: user.email
    }));
    // Saving loggedIn state in session storage because of
    // when user is authorized and page is reloading,
    // /editor page redirects to /signin page
    sessionStorage.setItem('mini-paint-loggedIn', 'true');
    store.dispatch(setError(null));
    return;
  }
  sessionStorage.setItem('mini-paint-loggedIn', 'false');
  store.dispatch(stopLoading());
  store.dispatch(logout());
  store.dispatch(setError(null));
});

export const authorizeUser = (email: string, password: string): void => {
  store.dispatch(startLoading());
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      sessionStorage.setItem('mini-paint-loggedIn', 'true');
    })
    .catch((error) => {
      store.dispatch(setError(error.message));
      store.dispatch(stopLoading());
    });
};

export const registerUser = (email: string, password: string): string | void => {
  store.dispatch(startLoading());
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      sessionStorage.setItem('mini-paint-loggedIn', 'true');
      return userCredential.user.uid;
    }).then((uid) => {
      saveUser(uid, email);
    })
    .catch((error) => {
      store.dispatch(stopLoading());
      store.dispatch(setError(error.message));
    });
};

export const signOutUser = () => {
  store.dispatch(startLoading());
  sessionStorage.setItem('mini-paint-loggedIn', 'false');
  signOut(auth).then(() => {
  }).catch(() => {
    store.dispatch(stopLoading());
  });
};
