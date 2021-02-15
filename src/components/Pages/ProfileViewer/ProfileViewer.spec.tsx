import React from 'react'
import { screen, render, waitFor } from '@testing-library/react'
import ProfileViewer from './ProfileViewer'

let history: any
const location = { pathname: '/r/-MTYSvF_9lP22WJ0UDL7', hash: '', search: '', state: '' }
let match: any

describe('Render ProfileViewer component with desired behaviors', () => {
  beforeEach(() => {
    render(<ProfileViewer history={history} location={location} match={match} />)
  })
  test('Render profile card correctly in the document after render with correct location', async () => {
    waitFor(() => {
      expect(screen.getByTestId('owner')).toBeInTheDocument()
      expect(screen.getByTestId('description')).toBeInTheDocument()
      expect(screen.getByTestId('github-stars')).toBeInTheDocument()
      expect(screen.getByTestId('contributors')).toBeInTheDocument()
    })
  })
})
