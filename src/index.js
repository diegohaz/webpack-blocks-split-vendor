// @flow
import WebpackMd5Hash from 'webpack-md5-hash'

type Blacklist = string | RegExp

type Options = {
  name: string,
  blacklist?: Blacklist,
}

const match = (userRequest, matcher?: Blacklist) => {
  if (!matcher) return true
  if (matcher instanceof RegExp) return !userRequest.match(matcher)
  return userRequest.indexOf(matcher) === -1
}

const isVendor = ({ blacklist }: Options) => ({ userRequest }) => (
  userRequest &&
  userRequest.indexOf('node_modules') >= 0 &&
  userRequest.match(/\.js$/) &&
  match(userRequest, blacklist)
)

/**
 * Returns a webpack block that splits vendor javascript bundle.
 */
const splitVendor = (name: string | Options = 'vendor'): any => ({ webpack }) => ({
  output: {
    filename: '[name].[chunkhash].js',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      minChunks: typeof name === 'object' ? isVendor(name) : isVendor({ name }),
      name: typeof name === 'object' ? name.name : name,
    }),
    new WebpackMd5Hash(),
  ],
})

module.exports = splitVendor
