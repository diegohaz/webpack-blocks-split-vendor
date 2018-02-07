import { createConfig } from '@webpack-blocks/webpack'
import splitVendor from '../src'

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
})
