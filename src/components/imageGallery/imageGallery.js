import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { getAllArtsByUser, deleteArt } from '../../firebase/db';
import { openModal } from '../../store/modalSlice';
import styles from './imageGallery.module.scss';

const ImageGallery = ({ gallery, onRemove }) => {
  const dispatch = useDispatch();

  const viewArt = (imageData) => {
    dispatch(openModal(imageData));
  };

  return (
    <>
      <h2>Gallery</h2>
      {
        !gallery.length ? 'You have not created any drawings yet.' : ''
      }
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
                <button className={styles.actionButton} type="button" onClick={() => onRemove(doc.id)}>
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

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf,
  onRemove: PropTypes.func
};

ImageGallery.defaultProps = {
  gallery: [],
  onRemove: () => {}
};

export default ImageGallery;
