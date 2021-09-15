import React, { useEffect, useState } from 'react';
import ImageGallery from '../components/imageGallery/imageGallery';
import { getAllArts, deleteArt, getAllArtsByUserEmail } from '../firebase/db';
import FilterByUser from '../components/filterByUser/filterByUser';

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    async function fetchArts() {
      const arts = await getAllArts();
      return arts;
    }

    fetchArts().then((data) => setGallery(data));
  }, []);

  useEffect(() => {
    async function fetchArts() {
      let arts = [];
      if (!filterValue) {
        arts = await getAllArts();
      } else {
        arts = await getAllArtsByUserEmail(filterValue);
      }
      return arts;
    }

    fetchArts().then((data) => {
      console.log(data);
      setGallery(data);
    });
  }, [filterValue]);

  const removeArt = (id) => {
    deleteArt(id);
    const gal = gallery.filter((image) => image.id !== id);
    setGallery(gal);
  };

  return (
    <>
      <h1>Gallery page</h1>
      <FilterByUser onFilter={setFilterValue} />
      <ImageGallery gallery={gallery} onRemove={(id) => removeArt(id)} />
      {
        !gallery.length
          ? (
            <p>
              Check the filter value;
            </p>
          )
          : ''
      }
    </>
  );
};

export default Gallery;
