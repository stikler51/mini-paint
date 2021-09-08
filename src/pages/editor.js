import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router';
import { useSelector } from 'react-redux';

const Editor = () => (
  <h1>Editor Page</h1>
);

export const EditorRoute = ({ path }) => {
  const { loggedIn } = useSelector((state) => state.user.value);
  console.log(loggedIn);

  return (
    <Route path={path}>
      {loggedIn ? <Editor /> : <Redirect to="/signin" />}
    </Route>
  );
};

EditorRoute.propTypes = {
  path: PropTypes.string
};

EditorRoute.defaultProps = {
  path: '/editor'
};

export default Editor;
