import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signOutUser } from '../../../firebase/index';
import styles from './header.module.scss';

const Header = () => {
  const { loggedIn, user } = useSelector((state) => state.user.value);
  return (
    <header className={`${styles.header}`}>
      <div className={`container ${styles.header_wrapper}`}>
        <NavLink to="/">
          <img className={styles.logo} src="/mini-paint-logo.png" alt="Logo" />
        </NavLink>
        {
          loggedIn ? (
            <div>
              <span>
                Hello,&nbsp;
                {user.email}
                !&nbsp;
              </span>
              <button className="btn btn-danger" type="button" onClick={signOutUser}>Log Out</button>
            </div>
          ) : <NavLink className="btn btn-success" to="signin">Sign In</NavLink>
        }
      </div>
    </header>
  );
};

export default Header;
