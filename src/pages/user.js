import React from 'react';
import { Route, Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const User = () => {
  const { user } = useSelector((state) => state.user.value);
  return (
    <>
      <h1>Your account</h1>
      {
        user ? (
          <>
            <p>
              <b>Email: </b>
              {user.email || ' '}
            </p>
            <p>
              <b>UID: </b>
              {user.uid || ' '}
            </p>
          </>
        ) : ''
      }
    </>
  );
};

export const UserRoute = ({ path }) => {
  const { loggedIn } = useSelector((state) => state.user.value);
  return (
    <Route path={path}>
      {loggedIn ? <User /> : <Redirect to="/signin" />}
    </Route>
  );
};

UserRoute.propTypes = {
  path: PropTypes.string
};

UserRoute.defaultProps = {
  path: '/user'
};

export default User;
