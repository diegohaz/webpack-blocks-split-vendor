// @flow
import WebpackMd5Hash from 'webpack-md5-hash'

const isVendor = ({ userRequest }) => (
  userRequest &&
  userRequest.indexOf('node_modules') >= 0 &&
  userRequest.match(/\.js$/)
)

/**
 * Returns a webpack block that splits vendor javascript bundle.
 */
const splitVendor = (name: string = 'vendor'): any => ({ webpack }) => ({
  output: {
    filename: '[name].[chunkhash].js',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      minChunks: isVendor,
      name,
    }),
    new WebpackMd5Hash(),
  ],
})

export default splitVendor
