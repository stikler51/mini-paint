import React from 'react'
import store from './store/store'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import Header from './components/layout/header/header'
import Home from './pages/home'
import SignIn from './pages/signIn'
import Register from './pages/register'
import User from './pages/user'
import Editor from './pages/editor'
import LoadingIndicator from './components/layout/loader/loader'
import Modal from './components/layout/modal/modal'
import Gallery from './pages/gallery'
import PrivateRoute from './routes/privateRoute'
import { onAuthStateChanged } from '@firebase/auth'
import { stopLoading } from './store/loadingSlice'
import { login, setError, logout } from './store/userSlice'
import { UserObjectType } from './types/types'
import { auth } from './firebase/firebase'

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
  store.dispatch(logout())
  store.dispatch(setError(null))
})

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <main className={store.getState().theme.value}>
          <div className="container">
            <Switch>
              <PrivateRoute path="/register" redirect="/user" inverse={true}>
                <Register />
              </PrivateRoute>
              <PrivateRoute path="/signin" redirect="/user" inverse={true}>
                <SignIn />
              </PrivateRoute>
              <PrivateRoute path="/user" redirect="/signin">
                <User />
              </PrivateRoute>
              <PrivateRoute path="/editor/:artId" redirect="/signin">
                <Editor />
              </PrivateRoute>
              <PrivateRoute path="/editor" redirect="/signin">
                <Editor />
              </PrivateRoute>
              <Route path="/gallery">
                <Gallery />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </main>
        <LoadingIndicator />
        <Modal />
      </Router>
    </Provider>
  )
}

export default App
