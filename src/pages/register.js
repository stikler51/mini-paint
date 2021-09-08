import React from 'react';
import { Route, Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import AuthorizationForm from '../components/authorizationForm/authorizationForm';
import {
  registerUser
} from '../firebase';

const Register = () => (
  <>
    <h1>Register page</h1>
    <AuthorizationForm cb={registerUser} action="Sign Up" />
  </>
);

export const RegisterRoute = ({ path }) => {
  const { loggedIn } = useSelector((state) => state.user.value);
  return (
    <Route path={path}>
      {loggedIn ? <Redirect to="/user" /> : <Register />}
    </Route>
  );
};

RegisterRoute.propTypes = {
  path: PropTypes.string
};

RegisterRoute.defaultProps = {
  path: '/signin'
};

export default Register;
