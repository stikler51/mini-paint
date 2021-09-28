import React from 'react'
import { Route, Redirect } from 'react-router'
import { useAppSelector } from '../store/hooks'
import AuthorizationForm from '../components/authorizationForm/authorizationForm'
import { authorizeUser } from '../firebase/auth'
import { RouteProps, UserReduxSliceType } from '../types/types'

const SignIn = () => (
  <>
    <h1>Sign in page</h1>
    <AuthorizationForm onSubmit={authorizeUser} action="Sign In" />
  </>
)

export const SignInRoute = ({ path }: RouteProps) => {
  const { loggedIn } = useAppSelector<UserReduxSliceType>((state) => state.user.value)
  return <Route path={path}>{loggedIn ? <Redirect to="/user" /> : <SignIn />}</Route>
}

export default SignIn
