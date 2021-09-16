import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router';
import { useAppSelector } from '../store/hooks';
import ImageGallery from '../components/imageGallery/imageGallery';
import { getAllArtsByUser, deleteArt } from '../firebase/db';

type UserType = {
  email: string,
  uid: string,
  accessToken: string
}

type UserStateType = {
  loggedIn: boolean,
  user: UserType | null
}

const User = () => {
  const [gallery, setGallery] = useState([]);
  const { user } = useAppSelector<UserStateType>((state) => state.user.value);

  useEffect(() => {
    async function fetchArts() {
      if (user) {
        const arts = await getAllArtsByUser(user.uid);
        return arts;
      }

      return [];
    }

    fetchArts().then((data: any) => setGallery(data));
  }, []);

  const removeArt = (id: string) => {
    deleteArt(id);
    const gal = gallery.filter((image: any) => image.id !== id);
    setGallery(gal);
  };

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
      <ImageGallery gallery={gallery} onRemove={(id) => removeArt(id)} />
    </>
  );
};

type routeProps = {
  path: string
}

export const UserRoute = ({ path }: routeProps) => {
  const { loggedIn } = useAppSelector((state) => state.user.value);
  return (
    <Route path={path}>
      {loggedIn ? <User /> : <Redirect to="/signin" />}
    </Route>
  );
};

export default User;
