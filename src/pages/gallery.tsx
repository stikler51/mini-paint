import React, { useEffect, useState } from 'react'
import ImageGallery from '../components/imageGallery/imageGallery'
import { getAllArts, deleteArt, getAllArtsByUserEmail } from '../firebase/db'
import FilterByUser from '../components/filterByUser/filterByUser'

const Gallery = () => {
  const [gallery, setGallery] = useState([])
  const [filterValue, setFilterValue] = useState('')

  useEffect(() => {
    getAllArts().then((data: any) => setGallery(data))
  }, [])

  useEffect(() => {
    async function fetchArts() {
      let arts = []
      if (!filterValue) {
        arts = await getAllArts()
      } else {
        arts = await getAllArtsByUserEmail(filterValue)
      }
      return arts
    }

    fetchArts().then((data: any) => {
      setGallery(data)
    })
  }, [filterValue])

  const removeArt = (id: string) => {
    deleteArt(id)
    const gal = gallery.filter((image: { id: any }) => image.id !== id)
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
