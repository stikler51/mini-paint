import React from 'react'
import { Route, Redirect } from 'react-router'
import { useAppSelector } from '../store/hooks'
import AuthorizationForm from '../components/authorizationForm/authorizationForm'
import { authorizeUser } from '../firebase/auth'

const SignIn = () => (
  <>
    <h1>Sign in page</h1>
    <AuthorizationForm cb={authorizeUser} action="Sign In" />
  </>
)

type RouteProps = {
  path: string
}

export const SignInRoute = ({ path }: RouteProps) => {
  const { loggedIn } = useAppSelector<{ loggedIn: boolean }>((state) => state.user.value)
  return <Route path={path}>{loggedIn ? <Redirect to="/user" /> : <SignIn />}</Route>
}

export default SignIn
