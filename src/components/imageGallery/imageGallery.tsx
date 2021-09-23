import React from 'react'
import { DocumentData } from '@firebase/firestore'
import { Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { openModal } from '../../store/modalSlice'
import styles from './imageGallery.module.scss'
import { UserReduxSliceType } from '../../types/types'

type GalleryProps = {
  gallery: DocumentData[]
  onRemove: (id: string) => void
}

const ImageGallery = ({ gallery, onRemove }: GalleryProps) => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector<UserReduxSliceType>((state) => state.user.value)
  const theme = useAppSelector<string>((state) => state.theme.value)

  const viewArt = (imageData: string): void => {
    dispatch(openModal(imageData))
  }

  return (
    <>
      {!gallery.length ? 'There is no any drawings yet.' : ''}
      <div className={styles[theme]}>
        {gallery.map((doc: DocumentData) => (
          <div key={doc.id} className={styles.artWrapper}>
            <img src={doc.data().imageData} alt={doc.id} />
            <div className={styles.actionsLayer}>
              <button className={styles.actionButton} type="button" onClick={() => viewArt(doc.data().imageData)}>
                <img src="./icons/focus.svg" alt="View" />
              </button>
              {user && doc.data().uid === user.uid ? (
                <>
                  <Link to={`editor/${doc.id}`} className={styles.actionButton}>
                    <img src="./icons/edit.svg" alt="Edit" />
                  </Link>
                  <button className={styles.actionButton} type="button" onClick={() => onRemove(doc.id)}>
                    <img src="./icons/delete.svg" alt="Delete" />
                  </button>
                </>
              ) : (
                ''
              )}
              <div className={styles.aboutArt}>
                <p>
                  Author:
                  {user && doc.data().uid === user.uid ? ' You' : ` ${doc.data().email}`}
                </p>
                <p>
                  Created:
                  {` ${new Date(doc.data().created.seconds * 1000).toLocaleString()}`}
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
