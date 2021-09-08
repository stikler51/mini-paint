import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from './components/layout/header/header';
import Home from './pages/home';
import { SignInRoute } from './pages/signIn';
import { RegisterRoute } from './pages/register';
import { UserRoute } from './pages/user';
import { EditorRoute } from './pages/editor';
import store from './store/store';
import LoadingIndicator from './components/layout/loader/loader';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Header />
          <div className="container">
            <Switch>
              <SignInRoute path="/signin" />
              <RegisterRoute path="/register" />
              <UserRoute path="/user" />
              <EditorRoute path="/editor" />
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </div>
        <LoadingIndicator />
      </Router>
    </Provider>
  );
}

export default App;
