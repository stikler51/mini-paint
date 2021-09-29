import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase'
import store from '../store/store'
import { login, logout, setError } from '../store/userSlice'
import { startLoading, stopLoading } from '../store/loadingSlice'
import { UserObjectType } from '../types/types'

// Changing redux user state on every login/logout event
onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(stopLoading())
    store.dispatch(login({ uid: user.uid, email: user.email } as UserObjectType))
    // Saving loggedIn state in session storage because of
    // when user is authorized and page is reloading,
    // /editor page redirects to /signin page
    sessionStorage.setItem('mini-paint-loggedIn', 'true')
    store.dispatch(setError(null))
    return
  }
  sessionStorage.setItem('mini-paint-loggedIn', 'false')
  store.dispatch(stopLoading())
  // store.dispatch(logout())
  store.dispatch(setError(null))
})

// export const authorizeUser = async ({ email, password }: AuthorizationFormInputs) => {
//   return signInWithEmailAndPassword(auth, email, password)
// }

// export const registerUser = ({ email, password }: AuthorizationFormInputs): Promise<any> => {
//   return createUserWithEmailAndPassword(auth, email, password)
// }
export const signOutUser = () => {}
