import { getInitialState } from './index'

describe('getInitialState', () => {
  it('runs all promises and returns state from cache', async () => {
    const MockApp = () => 'hello world'

    let resolvedPromises = 0
    const promiseCounter = jest.fn().mockImplementation(() => {
      resolvedPromises++
      return Promise.resolve()
    })

    const ssrPromises = [promiseCounter(), promiseCounter()]

    const mockClient = {
      ssrPromises,
      cache: {
        getInitialState: jest.fn().mockReturnValue({ foo: 'bar' })
      }
    }

    const result = await getInitialState({
      App: MockApp,
      client: mockClient
    })

    expect(result).toEqual({ foo: 'bar' })
    expect(resolvedPromises).toBe(2)
  })
})
