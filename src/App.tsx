import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import Header from './components/layout/header/header'
import Home from './pages/home'
import { SignInRoute } from './pages/signIn'
import { RegisterRoute } from './pages/register'
import { UserRoute } from './pages/user'
import { EditorRoute } from './pages/editor'
import store from './store/store'
import LoadingIndicator from './components/layout/loader/loader'
import Modal from './components/layout/modal/modal'
import Gallery from './pages/gallery'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <main className={store.getState().theme.value}>
          <div className="container">
            <Switch>
              <SignInRoute path="/signin" />
              <RegisterRoute path="/register" />
              <UserRoute path="/user" />
              <EditorRoute path="/editor/:artId" />
              <EditorRoute path="/editor" />
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
