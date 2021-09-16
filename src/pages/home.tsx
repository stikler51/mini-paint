import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <>
    <h1>Home page</h1>
    <Link className="btn btn-success" to="/editor">Start drawing</Link>
    <Link className="btn btn-success" to="/gallery">Art Gallery</Link>
  </>

);

export default Home;