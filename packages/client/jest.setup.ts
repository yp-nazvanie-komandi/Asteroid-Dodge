;(async () => {
  if (!globalThis.TextEncoder || !globalThis.TextDecoder) {
    const { TextDecoder, TextEncoder } = await import('node:util')

    globalThis.TextEncoder = TextEncoder
    globalThis.TextDecoder = TextDecoder as typeof globalThis.TextDecoder
  }
})()
