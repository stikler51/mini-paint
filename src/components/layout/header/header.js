import React from 'react';

import { NavLink } from 'react-router-dom';
import styles from './header.module.scss';

const Header = () => (
  <header className={`${styles.header}`}>
    <div className={`container ${styles.header_wrapper}`}>
      <h2>Mini-paint</h2>
      <NavLink to="signin">Sign In</NavLink>
      <NavLink to="register">Register</NavLink>
      {/* <button type="button" className="btn btn-info">Sign in</button> */}
    </div>
  </header>
);

export default Header;
