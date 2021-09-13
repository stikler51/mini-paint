// import { getFirestore, collection, getDocs } from 'firebase/firestore';
// import { QuerySnapshot } from '@firebase/firestore';
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
// import { createNewArt } from '../store/artSlice';

import store from '../store/store';

export const db = getFirestore();

const q = query(collection(db, 'art'));

export const getAllArts = async () => {
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot);
  querySnapshot.forEach((art) => {
    console.log(doc.art, ' => ', art.data());
  });
};

export const getAllArtsByUser = async (uid) => {
  const usersArts = await getDocs(query(collection(db, 'art'), where('uid', '==', uid)));
  return usersArts.docs;
};

export const saveArt = async (imageData) => {
  store.dispatch(startLoading());
  const { uid } = store.getState().user.value.user;
  const artRef = collection(db, 'art');
  const art = await addDoc(artRef, { uid, imageData });
  // store.dispatch(createNewArt(art.id));
  store.dispatch(stopLoading());
  return art.id;
};

export const updateArt = async (imageData, id) => {
  store.dispatch(startLoading());
  const artRef = doc(db, 'art', id);

  // Set the "capital" field of the city 'DC'
  await updateDoc(artRef, {
    imageData
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
