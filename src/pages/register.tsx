import React from 'react'
import { Route, Redirect } from 'react-router'
import { useAppSelector } from '../store/hooks'
import AuthorizationForm from '../components/authorizationForm/authorizationForm'
import { registerUser } from '../firebase/auth'
import { RouteProps, UserReduxSliceType } from '../types/types'

const Register = () => (
  <>
    <h1>Register page</h1>
    <AuthorizationForm cb={registerUser} action="Sign Up" />
  </>
)

export const RegisterRoute = ({ path }: RouteProps) => {
  const { loggedIn } = useAppSelector<UserReduxSliceType>((state) => state.user.value)
  return <Route path={path}>{loggedIn ? <Redirect to="/user" /> : <Register />}</Route>
}

export default Register
