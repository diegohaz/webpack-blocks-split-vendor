// @flow
/** */
export type Exclude = string | RegExp | Array<string | RegExp>

/** */
export type Options = {
  name: string,
  exclude?: Exclude,
}
