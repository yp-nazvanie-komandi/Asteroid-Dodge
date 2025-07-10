// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)
//test
test('dummy test', () => {
  expect(true).toBe(true)
})
