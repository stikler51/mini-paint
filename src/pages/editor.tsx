import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { useParams } from 'react-router';
import { useAppSelector } from '../store/hooks';
import EditorWrapper from '../components/editor/editorWrapper/editorWrapper';

const Editor = () => (
  <>
    <h1>Editor Page</h1>
    <EditorWrapper />
  </>
);

type routeProps = {
  path: string
}

// type UserType = {
//   email: string,
//   uid: string,
//   accessToken: string
// }

// type UserStateType = {
//   loggedIn: boolean,
//   user: UserType | null
// }

export const EditorRoute = ({ path }: routeProps) => {
  const { loggedIn } = useAppSelector((state) => state.user.value);
  const loggedInSessionStorage: boolean = JSON.parse(sessionStorage.getItem('mini-paint-loggedIn') || '');

  // const { artId } = useParams<{ artId: string }>();

  // useEffect(() => {
  //   console.log(artId);
  // }, []);

  return (
    <Route path={`${path}`}>
      {loggedIn || loggedInSessionStorage
        ? <Editor />
        : <Redirect to="/signin" />}
    </Route>
  );
};

export default Editor;
