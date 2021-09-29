import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../../../store/hooks'
import styles from './header.module.scss'
import { UserReduxSliceType } from '../../../types/types'
import { logOutUser } from '../../../store/userSlice'
import { useAppDispatch } from '../../../store/hooks'

const Header = () => {
  const { loggedIn, user } = useAppSelector<UserReduxSliceType>((state) => state.user?.value)
  const theme = useAppSelector<string>((state) => state.theme.value)
  const dispatch = useAppDispatch()

  return (
    <header className={`${styles[theme]}`}>
      <div className={`container ${styles.wrapper}`}>
        <NavLink to="/">
          <img className={styles.logo} src="/mini-paint-logo.png" alt="Logo" />
        </NavLink>
        {loggedIn ? (
          <div>
            <span>
              Hello,&nbsp;
              <NavLink to="/user">{user?.email}</NavLink>
              !&nbsp;
            </span>
            <button className="btn btn-danger" type="button" onClick={() => dispatch(logOutUser())}>
              Log Out
            </button>
          </div>
        ) : (
          <NavLink className="btn btn-success" to="signin">
            Sign In
          </NavLink>
        )}
      </div>
    </header>
  )
}

export default Header
