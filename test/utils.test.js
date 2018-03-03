import { testCondition, isVendor } from '../src/utils'

describe('testCondition', () => {
  it('returns false when the condition is not provided', () => {
    expect(testCondition('foo')).toBe(false)
  })

  it('handles string conditions', () => {
    expect(testCondition('foo bar', 'baz')).toBe(false)
    expect(testCondition('foo bar', 'foo')).toBe(true)
  })

  it('handles regexp conditions', () => {
    expect(testCondition('foo bar', /baz/)).toBe(false)
    expect(testCondition('foo bar', /foo/)).toBe(true)
  })

  it('handles array conditions', () => {
    expect(testCondition('foo', ['bar', 'baz'])).toBe(false)
    expect(testCondition('foo', [/bar/, /baz/])).toBe(false)
    expect(testCondition('foo', ['foo', 'bar'])).toBe(true)
    expect(testCondition('foo', [/foo/, /bar/])).toBe(true)
  })
})

describe('isVendor', () => {
  it('returns false when the resource is not provided', () => {
    expect(isVendor(null)).toBe(false)
  })

  it('returns false when the resource is not in node_modules', () => {
    expect(isVendor('foo/bar.js')).toBe(false)
  })

  it('returns true when the resource is in node_modules', () => {
    expect(isVendor('node_modules/foo/bar.js')).toBe(true)
  })

  it('returns false when the module has been excluded', () => {
    expect(isVendor('node_modules/foo/bar.js', undefined, /bar/)).toBe(false)
    expect(isVendor('node_modules/foo/bar.js', /bar/, /bar/)).toBe(false)
  })

  it('returns true when the module matches the condition', () => {
    expect(isVendor('node_modules/foo/bar.css', /\.css$/)).toBe(true)
  })

  it('returns false when the module matches the condition', () => {
    expect(isVendor('node_modules/foo/bar.js', /\.css$/)).toBe(false)
  })
})
