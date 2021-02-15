import React, { Suspense } from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'

const CreateProfile = React.lazy(() => import('./components/Pages/CreateProfile/CreateProfile'))
const ViewProfile = React.lazy(() => import('./components/Pages/ProfileViewer/ProfileViewer'))

import './App.scss'
import { Spinner } from '@atoms/index'

export function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <HashRouter basename="/">
        <Switch>
          <Route path="/r/:magicLink" component={ViewProfile} />
          <Route exact path="/" component={CreateProfile} />
        </Switch>
      </HashRouter>
    </Suspense>
  )
}
