import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import ImageGallery from '../components/imageGallery/imageGallery'
import { UserReduxSliceType } from '../types/types'
import { filterByUser } from '../store/filterSlice'

const User = () => {
  const { user } = useAppSelector<UserReduxSliceType>((state) => state.user.value)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(filterByUser(user?.email))
  }, [user])

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
      <ImageGallery />
    </>
  )
}

export default User
