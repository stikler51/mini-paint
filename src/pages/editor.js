import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EditorWrapper from '../components/editor/editorWrapper/editorWrapper';

const Editor = () => {
  const { artId } = useParams();
  console.log(artId);
  return (
    <>
      <h1>Editor Page</h1>
      {artId ? <h2>{artId}</h2> : ''}
      <EditorWrapper />
    </>
  );
};

export const EditorRoute = ({ path }) => {
  const { loggedIn } = useSelector((state) => state.user.value);
  // const artId = useSelector((state) => state.art.value);
  // console.log(artId);
  const loggedInSessionStorage = JSON.parse(sessionStorage.getItem('mini-paint-loggedIn'));

  // if (artId) {
  //   return (
  //     <Route path={`${path}`}>
  //       {loggedIn || loggedInSessionStorage
  //         ? artId
  //           ? <Redirect from="/editor" to={`editor/${artId}`} />
  //           : <Editor />
  //         : <Redirect to="/signin" />}
  //     </Route>
  //   );
  // }

  return (
    <Route path={`${path}`}>
      {loggedIn || loggedInSessionStorage
        ? <Editor />
        : <Redirect to="/signin" />}
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
