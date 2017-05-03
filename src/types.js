// @flow
/** */
export type Exclude = string | RegExp | string[] | RegExp[]

/** */
export type Options = {
  name: string,
  exclude?: Exclude,
}
