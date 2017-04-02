import { webpack } from '@webpack-blocks/webpack2'
import splitVendor from '../src'

describe('splitVendor', () => {
  let context

  beforeEach(() => {
    context = { webpack }
  })

  it('returns webpack block with passed chunkName', () => {
    const block = splitVendor('foo')(context)
    expect(block.plugins[0].chunkNames[0]).toBe('foo')
  })

  it('returns webpack block with default chunkName', () => {
    const block = splitVendor()(context)
    expect(block.plugins[0].chunkNames[0]).toBe('vendor')
  })
})
