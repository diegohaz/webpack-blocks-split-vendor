import { hasBeenExcluded, isVendor } from '../src/utils'

describe('hasBeenExcluded', () => {
  it('parses no exclude option', () => {
    expect(hasBeenExcluded('foo')).toBe(false)
  })

  it('parses string exclude', () => {
    expect(hasBeenExcluded('foo', 'bar')).toBe(false)
    expect(hasBeenExcluded('foo', 'foo')).toBe(true)
  })

  it('parses regexp exclude', () => {
    expect(hasBeenExcluded('foo', /bar/)).toBe(false)
    expect(hasBeenExcluded('foo', /foo/)).toBe(true)
  })

  it('parses array exclude', () => {
    expect(hasBeenExcluded('foo', ['bar', 'baz'])).toBe(false)
    expect(hasBeenExcluded('foo', [/bar/, /baz/])).toBe(false)
    expect(hasBeenExcluded('foo', ['foo', 'bar'])).toBe(true)
    expect(hasBeenExcluded('foo', [/foo/, /bar/])).toBe(true)
  })
})

test('isVendor', () => {
  expect(isVendor()({})).toBeFalsy()
  expect(isVendor()({ userRequest: 'foo/bar.js' })).toBeFalsy()
  expect(isVendor()({ userRequest: 'node_modules/foo/bar' })).toBeFalsy()
  expect(isVendor()({ userRequest: 'node_modules/foo/bar.js' })).toBeTruthy()
  expect(isVendor(/foo/)({ userRequest: 'node_modules/foo/bar.js' })).toBeFalsy()
})
