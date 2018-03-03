import { createConfig } from '@webpack-blocks/webpack'
import splitVendor from '../src'

jest.mock('../src/utils', () => ({
  isVendor: (resource, test, exclude) => ({ resource, test, exclude }),
}))

describe('splitVendor', () => {
  it('returns webpack block with passed string name', () => {
    const config = createConfig([
      splitVendor('foo'),
    ])
    expect(config.plugins[0].chunkNames[0]).toBe('foo')
  })

  it('returns webpack block with passed object name', () => {
    const config = createConfig([
      splitVendor({ name: 'foo' }),
    ])
    expect(config.plugins[0].chunkNames[0]).toBe('foo')
  })

  it('returns webpack block with default name', () => {
    const config = createConfig([
      splitVendor(),
    ])
    expect(config.plugins[0].chunkNames[0]).toBe('vendor')
  })

  it('returns webpack block that uses isVendor', () => {
    const expectedResource = 'node_modules/foo/bar.js'
    const expectedTest = /foo/
    const expectedExclude = /bar/

    const config = createConfig([
      splitVendor({ test: expectedTest, exclude: expectedExclude }),
    ])
    const {
      resource,
      test,
      exclude,
    } = config.plugins[0].minChunks({ resource: expectedResource })

    expect(resource).toBe(expectedResource)
    expect(test).toBe(expectedTest)
    expect(exclude).toBe(expectedExclude)
  })
})
