// @flow
import type { Exclude } from './types'

type UserRequest = string

type VendorData = {
  userRequest?: UserRequest,
}

export const hasBeenExcluded = (userRequest: UserRequest, exclude?: Exclude): boolean => {
  if (!exclude) {
    return false
  } else if (Array.isArray(exclude)) {
    return exclude.some(item => hasBeenExcluded(userRequest, item))
  } else if (exclude instanceof RegExp) {
    return exclude.test(userRequest)
  }

  return userRequest.indexOf(exclude) >= 0
}

export const isVendor = (exclude?: Exclude) => ({ userRequest }: VendorData) => (
  userRequest &&
  userRequest.indexOf('node_modules') >= 0 &&
  userRequest.match(/\.js$/) &&
  !hasBeenExcluded(userRequest, exclude)
)
