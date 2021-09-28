import React from 'react'
import AuthorizationForm from '../components/authorizationForm/authorizationForm'
import { authorizeUser } from '../firebase/auth'

const SignIn = () => (
  <>
    <h1>Sign in page</h1>
    <AuthorizationForm onSubmit={authorizeUser} action="Sign In" />
  </>
)

export default SignIn
