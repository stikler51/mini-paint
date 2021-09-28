import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import styles from './authorizationForm.module.scss'
import { UserReduxSliceType, AuthorizationFormInputs } from '../../types/types'
import { useForm } from 'react-hook-form'

type PropsType = {
  onSubmit: ({ email, password }: AuthorizationFormInputs) => void // Fn for authorization or registration
  action: string
}

// component used for authorization and registration actions
const AuthorizationForm = ({ onSubmit, action }: PropsType) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AuthorizationFormInputs>()

  // needed for applying right action to form (authorization or registration)
  const { pathname } = useLocation<string>()

  const user: UserReduxSliceType = useAppSelector((state) => state.user.value)
  const theme: string = useAppSelector((state) => state.theme.value)

  return (
    <div className={styles[theme]}>
      <form className={styles.authorizationForm} onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <input
            type="email"
            placeholder="E-mail"
            className="form-control"
            {...register('email', { required: true })}
          />
          {errors.email?.type === 'required' && <span className={styles.error}>Email is required</span>}
        </div>
        <div className="mb-2">
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            {...register('password', { required: true })}
          />
          {errors.password?.type === 'required' && <span className={styles.error}>Password is required</span>}
        </div>
        <input type="submit" className="btn btn-primary" value={action} />
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
