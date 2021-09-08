import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
  // Redirect
} from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from './components/layout/header/header';
import Home from './pages/home';
import SignIn from './pages/signIn';
import Register from './pages/register';
import { EditorRoute } from './pages/editor';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Header />
          <div className="container">
            <Switch>
              <Route path="/signin">
                <SignIn />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <EditorRoute path="/editor" />
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
