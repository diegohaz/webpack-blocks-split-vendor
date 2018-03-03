// @flow
import type { Condition } from './types'

export const testCondition = (str: string, condition?: Condition): boolean => {
  if (!condition) return false
  if (Array.isArray(condition)) return condition.some(item => testCondition(str, item))
  if (condition instanceof RegExp) return condition.test(str)
  return str.indexOf(condition) >= 0
}

export const isVendor = (resource: string, test?: Condition = /\.js$/, exclude?: Condition) => {
  if (!resource) return false
  if (resource.indexOf('node_modules') < 0) return false
  if (!testCondition(resource, test)) return false
  if (testCondition(resource, exclude)) return false
  return true
}
