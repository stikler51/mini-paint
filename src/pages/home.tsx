import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
  <>
    <div className="homeBanner">
      <h1 className="homeBanner__title">
        The best web application (really not)
        <br />
        for drawing&nbsp;
        <span className="easterEgg" />
      </h1>
      <div className="mainPageButtons">
        <Link className="btn btn-success" to="/editor">
          Start drawing
        </Link>
        <Link className="btn btn-success" to="/gallery">
          Art Gallery
        </Link>
      </div>
    </div>
  </>
)

export default Home
