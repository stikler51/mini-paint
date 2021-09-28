import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { PrivateRouteProps, UserReduxSliceType } from '../types/types'
import { useAppSelector } from '../store/hooks'

const PrivateRoute = ({ path, redirect, inverse, children }: PrivateRouteProps) => {
  const { loggedIn } = useAppSelector<UserReduxSliceType>((state) => state.user.value)
  const loggedInSessionStorage: boolean = JSON.parse(sessionStorage.getItem('mini-paint-loggedIn') || '')
  if (inverse) {
    return <Route path={path}>{loggedIn || loggedInSessionStorage ? <Redirect to={redirect} /> : children}</Route>
  } else {
    return <Route path={`${path}`}>{loggedIn || loggedInSessionStorage ? children : <Redirect to={redirect} />}</Route>
  }
}

export default PrivateRoute
