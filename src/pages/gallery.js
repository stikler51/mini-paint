import React, { useEffect, useState } from 'react';
import ImageGallery from '../components/imageGallery/imageGallery';
import { getAllArts, deleteArt } from '../firebase/db';

const Gallery = () => {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    async function fetchArts() {
      const arts = await getAllArts();
      return arts;
    }

    fetchArts().then((data) => setGallery(data));
  }, []);

  const removeArt = (id) => {
    deleteArt(id);
    const gal = gallery.filter((image) => image.id !== id);
    setGallery(gal);
  };

  return (
    <>
      <h1>Gallery page</h1>
      <ImageGallery gallery={gallery} onRemove={(id) => removeArt(id)} />
    </>
  );
};

export default Gallery;
