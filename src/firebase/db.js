import {
  getFirestore,
  collection,
  query,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  getDoc,
  where
} from 'firebase/firestore';
import { startLoading, stopLoading } from '../store/loadingSlice';

import store from '../store/store';

export const db = getFirestore();

const q = query(collection(db, 'art'));

export const getAllArts = async () => {
  store.dispatch(startLoading());
  const allArts = await getDocs(q);
  store.dispatch(stopLoading());
  return allArts.docs;
};

export const getAllArtsByUser = async (uid) => {
  store.dispatch(startLoading());
  const usersArts = await getDocs(query(collection(db, 'art'), where('uid', '==', uid)));
  store.dispatch(stopLoading());
  return usersArts.docs;
};

export const saveArt = async (imageData) => {
  store.dispatch(startLoading());
  const { uid, email } = store.getState().user.value.user;
  const artRef = collection(db, 'art');
  const art = await addDoc(artRef, {
    uid,
    email,
    imageData,
    created: new Date()
  });
  store.dispatch(stopLoading());
  return art.id;
};

export const updateArt = async (imageData, id) => {
  store.dispatch(startLoading());
  const artRef = doc(db, 'art', id);

  await updateDoc(artRef, {
    imageData,
    updated: new Date()
  });

  store.dispatch(stopLoading());
};

export const deleteArt = async (id) => {
  store.dispatch(startLoading());
  await deleteDoc(doc(db, 'art', id));
  store.dispatch(stopLoading());
};

export const getOneArt = async (id) => {
  store.dispatch(startLoading());
  const docRef = doc(db, 'art', id);
  const docSnap = await getDoc(docRef);
  store.dispatch(stopLoading());
  return docSnap;
};
