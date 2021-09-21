import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import styles from './authorizationForm.module.scss'

type PropsType = {
  cb: (mail: string, pass: string) => void // Fn for authorization or registration
  action: string
}

type UserObjectType = {
  email: string
  uid: string
  accessToken: string
}

type UserType = {
  user: null | UserObjectType
  loggedIn: boolean
  errors: string | null
}

// component used for authorization and registration actions
const AuthorizationForm = ({ cb, action }: PropsType) => {
  const [email, setEmail] = useState<string>('') // input email value
  const [password, setPassword] = useState<string>('') // input password value

  // needed for applying right action to form (authorization or registration)
  const { pathname } = useLocation<string>()

  const user: UserType = useAppSelector((state) => state.user.value)
  const theme: string = useAppSelector((state) => state.theme.value)

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
            e.preventDefault() // don't refresh page
            cb(email, password)
          }}
          value={action}
        />
        {pathname === '/signin' ? (
          <span>
            Don&apos;t have account?
            <Link to="/register">Create one</Link>
          </span>
        ) : (
          ''
        )}

        {user && user.errors ? <span className={styles.error}>{user.errors}</span> : ''}
      </form>
    </div>
  )
}

export default AuthorizationForm
