import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Link,
  useLocation
} from 'react-router-dom';
import styles from './authorizationForm.module.scss';

const AuthorizationForm = ({ cb, action }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { pathname } = useLocation();
  const user = useSelector((state) => state.user.value);
  const theme = useSelector((state) => state.theme.value);

  return (
    <div className={styles[theme]}>
      <div className={styles.authorizationForm}>
        <div className="mb-2">
          <input
            type="email"
            placeholder="E-mail"
            className="form-control"
            value={email}
            onInput={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            value={password}
            onInput={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary"
          onClick={() => cb(email, password)}
          value={action}
        />
        {
          pathname === '/signin' ? (
            <span>
              Don&apos;t have account?
              <Link to="/register">Create one</Link>
            </span>
          ) : ''
        }

        {
          user && user.errors
            ? <span className={styles.error}>{user.errors}</span>
            : ''
        }

      </div>

      {/* <div>
        <input type="submit" onClick={() => registerUser(email, password)} value="Register" />

        <button type="button" onClick={() => console.log(auth.currentUser)}>
          Current user
        </button>

        <button type="button" onClick={signOutUser}>
          Sign Out
        </button>

        <button type="button" onClick={() => console.log(user)}>
          Show state
        </button>
      </div> */}
    </div>
  );
};

AuthorizationForm.propTypes = {
  action: PropTypes.string,
  cb: PropTypes.func
};

AuthorizationForm.defaultProps = {
  action: 'Sign In',
  cb: null
};

export default AuthorizationForm;
