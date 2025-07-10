import { createDefaultEsmPreset, type JestConfigWithTsJest } from 'ts-jest'

const presetConfig = createDefaultEsmPreset()

const jestConfig: JestConfigWithTsJest = {
  ...presetConfig,
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/jest.setup.ts'],
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
}

export default jestConfig
