import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './header.module.scss';

const Header = () => (
  <header className={`${styles.header}`}>
    <div className={`container ${styles.header_wrapper}`}>
      <NavLink to="/">
        <img className={styles.logo} src="/mini-paint-logo.png" alt="Logo" />
      </NavLink>
      <NavLink className="btn btn-success" to="signin">Sign In</NavLink>
    </div>
  </header>
);

export default Header;
