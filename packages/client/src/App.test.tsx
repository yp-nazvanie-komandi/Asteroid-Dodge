import App from './App'
import { render, screen } from '@testing-library/react'

const appContent = 'Вот тут будет жить ваше приложение :)'

globalThis.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
) as unknown as typeof globalThis.fetch

test('Example test', async () => {
  render(<App />)
  expect(screen.getByText(appContent)).toBeDefined()
})
