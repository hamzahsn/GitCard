import React from 'react'
import { screen, render, act, waitFor, fireEvent } from '@testing-library/react'
import CreateProfile from './CreateProfile'

describe('Render CreateProfile component with desired behaviors', () => {
  beforeEach(() => {
    render(<CreateProfile />)
  })
  test('Render Create profile card correctly in the document', () => {
    expect(screen.getByTestId('username')).toBeInTheDocument()
    expect(screen.getByTestId('repository')).toBeInTheDocument()
    expect(screen.getByTestId('color-picker')).toBeInTheDocument()
    expect(screen.getByTestId('icon-picker')).toBeInTheDocument()
    expect(screen.getByTestId('reset-button')).toBeInTheDocument()
    expect(screen.getByTestId('submit-button')).toBeInTheDocument()
  })

  test('submit and reset buttons are enabled after giving username and a repo', async () => {
    const userName = screen.getByTestId('username') as HTMLInputElement
    const repository = screen.getByTestId('repository') as HTMLInputElement
    const submitButton = screen.getByTestId('submit-button') as HTMLInputElement
    const resetButton = screen.getByTestId('reset-button') as HTMLInputElement

    expect(submitButton).toBeDisabled()
    expect(resetButton).toBeDisabled()

    act(() => {
      fireEvent.change(userName, { target: { value: 'facebook' } })
      fireEvent.change(repository, { target: { value: 'react' } })
    })
    waitFor(() => {
      expect(submitButton).not.toBeDisabled()
      expect(resetButton).not.toBeDisabled()
    })
  })

  test('should create a link after submitting a correct username and repo', async () => {
    const userName = screen.getByTestId('username') as HTMLInputElement
    const repository = screen.getByTestId('repository') as HTMLInputElement
    const submitButton = screen.getByTestId('submit-button') as HTMLInputElement

    act(() => {
      fireEvent.change(userName, { target: { value: 'facebook' } })
      fireEvent.change(repository, { target: { value: 'react' } })
      fireEvent.click(submitButton)
    })
    waitFor(() => {
      expect(screen.getByTestId('magic-link')).toBeInTheDocument()
    })
  })

  test('should create an error when repo or username are invalid', async () => {
    const userName = screen.getByTestId('username') as HTMLInputElement
    const repository = screen.getByTestId('repository') as HTMLInputElement
    const submitButton = screen.getByTestId('submit-button') as HTMLInputElement

    act(() => {
      fireEvent.change(userName, { target: { value: 'facebook' } })
      fireEvent.change(repository, { target: { value: 'nodejs' } })
      fireEvent.click(submitButton)
    })
    waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument()
    })
  })
})
