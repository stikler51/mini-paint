import React from 'react'
import AuthorizationForm from '../components/authorizationForm/authorizationForm'
// import { authorizeUser } from '../firebase/auth'
import { useAppDispatch } from '../store/hooks'
import { loginUser } from '../store/userSlice'
import { AuthorizationFormInputs } from '../types/types'

const SignIn = () => {
  const dispatch = useAppDispatch()
  return (
    <>
      <h1>Sign in page</h1>
      <AuthorizationForm
        onSubmit={({ email, password }: AuthorizationFormInputs) => dispatch(loginUser({ email, password }))}
        action="Sign In"
      />
    </>
  )
}

export default SignIn
