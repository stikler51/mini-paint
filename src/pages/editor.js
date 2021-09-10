import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import EditorWrapper from '../components/editor/editorWrapper/editorWrapper';

const Editor = () => (
  <>
    <h1>Editor Page</h1>
    <EditorWrapper />
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
