import React, { useState } from 'react';
import {
  auth,
  authorizeUser,
  registerUser,
  signOutUser
} from '../../firebase';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <p>Please sign-in:</p>
      <div>
        <input
          type="email"
          value={email}
          onInput={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          value={password}
          onInput={(e) => setPassword(e.target.value)}
          required
        />
        <input type="submit" onClick={() => authorizeUser(email, password)} value="Login" />
        <input type="submit" onClick={() => registerUser(email, password)} value="Register" />
      </div>

      <button type="button" onClick={() => console.log(auth.currentUser)}>
        Current user
      </button>

      <button type="button" onClick={signOutUser}>
        Sign Out
      </button>
    </div>
  );
};

export default SignInForm;
