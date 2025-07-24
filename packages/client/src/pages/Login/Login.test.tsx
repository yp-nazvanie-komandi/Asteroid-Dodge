import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Login } from './Login'

const mockSignin = jest.fn().mockResolvedValue({ successful: true })

jest.mock('../../services/Auth/Auth', () => ({
  Auth: {
    getInstance: () => ({
      signin: mockSignin,
    }),
  },
}))

describe('Login component', () => {
  it('redirects to /profile on successful login', async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<div>Mock Profile Page</div>} />
        </Routes>
      </MemoryRouter>
    )

    fireEvent.change(screen.getByLabelText(/login/i), {
      target: { value: 'testuser' },
    })

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    })

    fireEvent.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() => {
      expect(mockSignin).toHaveBeenCalledWith({
        login: 'testuser',
        password: 'password123',
      })

      expect(screen.getByText(/mock profile page/i)).toBeInTheDocument()
    })
  })
})
