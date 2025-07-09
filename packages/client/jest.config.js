import dotenv from 'dotenv'

dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },

  // Для поддержки ESM в Jest
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    // добавьте следующую строку для обработки стилей
    '^.+\\.(css|scss)$': 'jest-transform-stub',
  }
}
