import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { openModal } from '../../store/modalSlice'
import styles from './imageGallery.module.scss'
import { UserReduxSliceType, galleryArt } from '../../types/types'
import { loadAllArts, removeArt } from '../../store/gallerySlice'

const ImageGallery = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector<UserReduxSliceType>((state) => state.user.value)
  const theme = useAppSelector<string>((state) => state.theme.value)
  const reduxGallery = useAppSelector((state) => state.gallery.value)
  const { selectedUser } = useAppSelector((state) => state.filter.value)

  useEffect(() => {
    dispatch(loadAllArts(selectedUser))
  }, [selectedUser])

  const viewArt = (imageData: string): void => {
    dispatch(openModal(imageData))
  }

  return (
    <>
      {!reduxGallery.length ? 'There is no any drawings yet.' : ''}
      <div className={styles[theme]}>
        {reduxGallery.map((doc: galleryArt) => (
          <div key={doc.id} className={styles.artWrapper}>
            <img src={doc.imageData} alt={doc.id} />
            <div className={styles.actionsLayer}>
              <button className={styles.actionButton} type="button" onClick={() => viewArt(doc.imageData)}>
                <img src="./icons/focus.svg" alt="View" />
              </button>
              {user && doc.uid === user.uid ? (
                <>
                  <Link to={`editor/${doc.id}`} className={styles.actionButton}>
                    <img src="./icons/edit.svg" alt="Edit" />
                  </Link>
                  <button className={styles.actionButton} type="button" onClick={() => dispatch(removeArt(doc.id))}>
                    <img src="./icons/delete.svg" alt="Delete" />
                  </button>
                </>
              ) : (
                ''
              )}
              <div className={styles.aboutArt}>
                <p>
                  Author:
                  {user && doc.uid === user.uid ? ' You' : ` ${doc.email}`}
                </p>
                <p>
                  Created:
                  {` ${new Date(doc.created * 1000).toLocaleString()}`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default ImageGallery
