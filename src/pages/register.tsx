import React from 'react'
import AuthorizationForm from '../components/authorizationForm/authorizationForm'
import { registerUser } from '../firebase/auth'

const Register = () => (
  <>
    <h1>Register page</h1>
    <AuthorizationForm onSubmit={registerUser} action="Sign Up" />
  </>
)

export default Register
