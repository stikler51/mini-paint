import React, { useState } from 'react';
import {
  Link,
  useLocation
} from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import styles from './authorizationForm.module.scss';

const AuthorizationForm: React.FC<{
  cb: (mail: string, pass: string) => void,
  action: string
}> = ({ cb, action }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { pathname } = useLocation();
  const user = useAppSelector((state) => state.user.value);
  const theme = useAppSelector((state) => state.theme.value);

  return (
    <div className={styles[theme]}>
      <form className={styles.authorizationForm}>
        <div className="mb-2">
          <input
            type="email"
            placeholder="E-mail"
            className="form-control"
            value={email}
            onInput={(e) => setEmail(e.currentTarget.value)}
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            value={password}
            onInput={(e) => setPassword(e.currentTarget.value)}
            required
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            cb(email, password);
          }}
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

      </form>
    </div>
  );
};

// AuthorizationForm.propTypes = {
//   action: PropTypes.string,
//   cb: PropTypes.func
// };

// AuthorizationForm.defaultProps = {
//   action: 'Sign In',
//   cb: null
// };

export default AuthorizationForm;
