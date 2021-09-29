import React from 'react'
import AuthorizationForm from '../components/authorizationForm/authorizationForm'
import { signUpUser } from '../store/userSlice'
import { useAppDispatch } from '../store/hooks'
import { AuthorizationFormInputs } from '../types/types'

const Register = () => {
  const dispatch = useAppDispatch()
  return (
    <>
      <h1>Register page</h1>
      <AuthorizationForm
        onSubmit={({ email, password }: AuthorizationFormInputs) => dispatch(signUpUser({ email, password }))}
        action="Sign Up"
      />
    </>
  )
}

export default Register
