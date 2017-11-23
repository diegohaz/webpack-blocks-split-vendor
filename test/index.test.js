import splitVendor from '../src'

describe('splitVendor', () => {
  it('returns webpack block with passed string name', () => {
    const block = splitVendor('foo')()()
    expect(block.plugins[0].chunkNames[0]).toBe('foo')
  })

  it('returns webpack block with passed object name', () => {
    const block = splitVendor({ name: 'foo' })()()
    expect(block.plugins[0].chunkNames[0]).toBe('foo')
  })

  it('returns webpack block with default name', () => {
    const block = splitVendor()()()
    expect(block.plugins[0].chunkNames[0]).toBe('vendor')
  })
})
