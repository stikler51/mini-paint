import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { openModal } from '../../store/modalSlice';
import styles from './imageGallery.module.scss';

const ImageGallery = ({ gallery, onRemove }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user.value);
  const theme = useSelector((state) => state.theme.value);

  const viewArt = (imageData) => {
    dispatch(openModal(imageData));
  };

  return (
    <>
      {
        !gallery.length ? 'There is no any drawings yet.' : ''
      }
      <div className={styles[theme]}>
        {
          gallery.map((doc) => (
            <div key={doc.id} className={styles.artWrapper}>
              <img src={doc.data().imageData} alt={doc.id} />
              <div className={styles.actionsLayer}>
                <button className={styles.actionButton} type="button" onClick={() => viewArt(doc.data().imageData)}>
                  <img src="./icons/focus.svg" alt="View" />
                </button>
                {
                  user && doc.data().uid === user.uid
                    ? (
                      <>
                        <Link to={`editor/${doc.id}`} className={styles.actionButton}>
                          <img src="./icons/edit.svg" alt="Edit" />
                        </Link>
                        <button className={styles.actionButton} type="button" onClick={() => onRemove(doc.id)}>
                          <img src="./icons/delete.svg" alt="Delete" />
                        </button>
                      </>
                    )
                    : ''
                }
                <div className={styles.aboutArt}>
                  <p>
                    Author:
                    {
                      user && doc.data().uid === user.uid
                        ? ' You'
                        : ` ${doc.data().email}`
                    }
                  </p>
                  <p>
                    Created:
                    {
                      ` ${new Date(doc.data().created.seconds * 1000).toLocaleString()}`
                    }
                  </p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
};

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(PropTypes.object),
  onRemove: PropTypes.func
};

ImageGallery.defaultProps = {
  gallery: [],
  onRemove: null
};

export default ImageGallery;
