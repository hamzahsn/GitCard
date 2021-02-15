import React, { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'

const CreateProfile = React.lazy(() => import('./components/Pages/CreateProfile/CreateProfile'))
const ViewProfile = React.lazy(() => import('./components/Pages/ProfileViewer/ProfileViewer'))

import './App.scss'
import { Spinner } from '@atoms/index'

export function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Router>
        <Switch>
          <Route path="/" component={CreateProfile} exact />
          <Route path="/r/:magicLink" component={ViewProfile} exact />
        </Switch>
      </Router>
    </Suspense>
  )
}
