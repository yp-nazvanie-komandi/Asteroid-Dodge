require('@testing-library/jest-dom')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { TextEncoder, TextDecoder } = require('util')
globalThis.TextEncoder = TextEncoder
globalThis.TextDecoder = TextDecoder