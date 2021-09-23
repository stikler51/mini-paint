import React, { useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router'
import { useAppSelector } from '../store/hooks'
import ImageGallery from '../components/imageGallery/imageGallery'
import { getAllArtsByUser, deleteArt } from '../firebase/db'
import { DocumentData, QueryDocumentSnapshot } from '@firebase/firestore'
import { RouteProps, UserReduxSliceType } from '../types/types'

const User = () => {
  const [gallery, setGallery] = useState<DocumentData[]>([])
  const { user } = useAppSelector<UserReduxSliceType>((state) => state.user.value)

  useEffect(() => {
    if (user) {
      getAllArtsByUser(user.uid).then((data: QueryDocumentSnapshot<DocumentData>[]) => setGallery(data))
    }
  }, [])

  const removeArt = (id: string) => {
    deleteArt(id)
    const gal = gallery.filter((image: DocumentData) => image.id !== id)
    setGallery(gal)
  }

  return (
    <>
      <h1>Your account</h1>
      {user ? (
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
      ) : (
        ''
      )}
      <ImageGallery gallery={gallery} onRemove={(id) => removeArt(id)} />
    </>
  )
}

export const UserRoute = ({ path }: RouteProps) => {
  const { loggedIn } = useAppSelector<UserReduxSliceType>((state) => state.user.value)
  return <Route path={path}>{loggedIn ? <User /> : <Redirect to="/signin" />}</Route>
}

export default User
