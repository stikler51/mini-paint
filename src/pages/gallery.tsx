import React, { useEffect, useState } from 'react'
import ImageGallery from '../components/imageGallery/imageGallery'
import { getAllArts, deleteArt, getAllArtsByUserEmail } from '../firebase/db'
import FilterByUser from '../components/filterByUser/filterByUser'
import { DocumentData, QueryDocumentSnapshot } from '@firebase/firestore'

const Gallery = () => {
  const [gallery, setGallery] = useState<DocumentData[]>([])
  const [filterValue, setFilterValue] = useState<string>('')

  useEffect(() => {
    getAllArts().then((data: DocumentData[]) => {
      console.log(data[0].id)
      setGallery(data)
    })
  }, [])

  useEffect(() => {
    if (!filterValue) {
      getAllArts().then((data: QueryDocumentSnapshot<DocumentData>[]) => {
        setGallery(data)
      })
    } else {
      getAllArtsByUserEmail(filterValue).then((data: QueryDocumentSnapshot<DocumentData>[]) => {
        setGallery(data)
      })
    }
  }, [filterValue])

  const removeArt = (id: string) => {
    deleteArt(id)
    const gal: DocumentData[] = gallery.filter((image: DocumentData) => image.id !== id)
    setGallery(gal)
  }

  return (
    <>
      <h1>Gallery page</h1>
      <FilterByUser onFilter={setFilterValue} />
      <ImageGallery gallery={gallery} onRemove={(id) => removeArt(id)} />
      {!gallery.length ? <p>Check the filter value</p> : ''}
    </>
  )
}

export default Gallery
