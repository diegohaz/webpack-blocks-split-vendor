import { webpack } from '@webpack-blocks/webpack2'
import splitVendor from '../src'

describe('splitVendor', () => {
  let context

  beforeEach(() => {
    context = { webpack }
  })

  it('returns webpack block with passed chunkName', () => {
    expect(splitVendor('foo')(context)).toMatchSnapshot()
  })

  it('returns webpack block with default chunkName', () => {
    expect(splitVendor()(context)).toMatchSnapshot()
  })
})
