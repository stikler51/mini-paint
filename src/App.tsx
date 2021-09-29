import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import Header from './components/layout/header/header'
import Home from './pages/home'
import SignIn from './pages/signIn'
import Register from './pages/register'
import User from './pages/user'
import Editor from './pages/editor'
import store from './store/store'
import LoadingIndicator from './components/layout/loader/loader'
import Modal from './components/layout/modal/modal'
import Gallery from './pages/gallery'
import PrivateRoute from './routes/privateRoute'

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
