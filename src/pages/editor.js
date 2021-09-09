import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import DrawingArea from '../components/editor/drawingArea/drawingArea';

const Editor = () => (
  <>
    <h1>Editor Page</h1>
    <DrawingArea />
  </>
);

export const EditorRoute = ({ path }) => {
  const { loggedIn } = useSelector((state) => state.user.value);
  const loggedInSessionStorage = JSON.parse(sessionStorage.getItem('mini-paint-loggedIn'));

  return (
    <Route path={path}>
      {loggedIn || loggedInSessionStorage ? <Editor /> : <Redirect to="/signin" />}
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
