import { collection, query, doc, getDocs, addDoc, deleteDoc, updateDoc, getDoc, where } from 'firebase/firestore'
import { db } from './firebase'
import { startLoading, stopLoading } from '../store/loadingSlice'
import store from '../store/store'

const q = query(collection(db, 'art'))

export const saveArt = async (imageData: string) => {
  store.dispatch(startLoading())
  const { uid, email }: any = store.getState().user.value.user
  const artRef = collection(db, 'art')
  const art = await addDoc(artRef, {
    uid,
    email,
    imageData,
    created: new Date(),
  })
  store.dispatch(stopLoading())
  return art.id
}

export const updateArt = async (imageData: string, id: string) => {
  store.dispatch(startLoading())
  const artRef = doc(db, 'art', id)

  await updateDoc(artRef, {
    imageData,
    updated: new Date(),
  })

  store.dispatch(stopLoading())
}

export const getOneArt = async (id: string) => {
  store.dispatch(startLoading())
  const docRef = doc(db, 'art', id)
  const docSnap = await getDoc(docRef)
  store.dispatch(stopLoading())
  return docSnap
}

export const saveUser = async (uid: string, email: string) => {
  const userRef = collection(db, 'users')
  await addDoc(userRef, {
    uid,
    email,
    created: new Date(),
  })
}
