import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllArtsByUser, deleteArt } from '../../firebase/db';
import { openModal } from '../../store/modalSlice';
import styles from './imageGallery.module.scss';

const ImageGallery = () => {
  const [gallery, setGallery] = useState([]);
  const { user } = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

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

  const viewArt = (imageData) => {
    dispatch(openModal(imageData));
  };

  return (
    <>
      <h2>Gallery</h2>
      <div className={styles.gallery}>
        {
          gallery.map((doc) => (
            <div key={doc.id} className={styles.artWrapper}>
              <img src={doc.data().imageData} alt={doc.id} />
              <div className={styles.actionsLayer}>
                <button className={styles.actionButton} type="button" onClick={() => viewArt(doc.data().imageData)}>
                  <img src="./icons/focus.svg" alt="View" />
                </button>
                <Link to={`editor/${doc.id}`} className={styles.actionButton}>
                  <img src="./icons/edit.svg" alt="Edit" />
                </Link>
                <button className={styles.actionButton} type="button" onClick={() => removeArt(doc.id)}>
                  <img src="./icons/delete.svg" alt="Delete" />
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default ImageGallery;
