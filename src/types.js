// @flow
/** */
export type Condition = string | RegExp | Array<Condition>

/** */
export type Options = {
  name: string,
  test?: Condition,
  exclude?: Condition,
}
