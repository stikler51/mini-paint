import React from 'react';
import { Route, Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import AuthorizationForm from '../components/authorizationForm/authorizationForm';
import {
  authorizeUser
} from '../firebase';

const SignIn = () => (
  <>
    <h1>Sign in page</h1>
    <AuthorizationForm cb={authorizeUser} action="Sign In" />
  </>
);

export const SignInRoute = ({ path }) => {
  const { loggedIn } = useSelector((state) => state.user.value);
  return (
    <Route path={path}>
      {loggedIn ? <Redirect to="/user" /> : <SignIn />}
    </Route>
  );
};

SignInRoute.propTypes = {
  path: PropTypes.string
};

SignInRoute.defaultProps = {
  path: '/signin'
};

export default SignIn;
