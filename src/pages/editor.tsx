import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import EditorWrapper from '../components/editor/editorWrapper/editorWrapper'
import { RouteProps, UserReduxSliceType } from '../types/types'

const Editor = () => (
  <>
    <h1>Editor Page</h1>
    <EditorWrapper />
  </>
)

export const EditorRoute = ({ path }: RouteProps) => {
  const { loggedIn } = useAppSelector<UserReduxSliceType>((state) => state.user.value)
  const loggedInSessionStorage: boolean = JSON.parse(sessionStorage.getItem('mini-paint-loggedIn') || '')
  return <Route path={`${path}`}>{loggedIn || loggedInSessionStorage ? <Editor /> : <Redirect to="/signin" />}</Route>
}

export default Editor
