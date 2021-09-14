import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ImageGallery from '../components/imageGallery/imageGallery';
import { getAllArtsByUser, deleteArt } from '../firebase/db';

const User = () => {
  const [gallery, setGallery] = useState([]);
  const { user } = useSelector((state) => state.user.value);

  useEffect(() => {
    async function fetchArts() {
      const arts = await getAllArtsByUser(user.uid);
      return arts;
    }

    fetchArts().then((data) => setGallery(data));
  }, []);

  const removeArt = (id) => {
    deleteArt(id);
    const gal = gallery.filter((image) => image.id !== id);
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
