import React, { useEffect } from 'react'
import ImageGallery from '../components/imageGallery/imageGallery'
import FilterByUser from '../components/filterByUser/filterByUser'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { filterByUser } from '../store/filterSlice'

const Gallery = () => {
  const gallery = useAppSelector((state) => state.gallery.value)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(filterByUser(''))
  }, [])

  return (
    <>
      <h1>Gallery page</h1>
      <FilterByUser />
      <ImageGallery />
      {!gallery.length ? <p>Check the filter value</p> : ''}
    </>
  )
}

export default Gallery
