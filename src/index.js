// @flow
import { webpack, group, env, addPlugins, setOutput } from '@webpack-blocks/webpack2'
import WebpackMd5Hash from 'webpack-md5-hash'
import { isVendor } from './utils'
import type { Options } from './types'

/**
 * Returns a webpack block that splits vendor javascript bundle.
 */
const splitVendor = (options: string | Options): Function => {
  const {
    name = 'vendor',
    exclude,
  } = typeof options === 'object' ? options : { name: options, exclude: undefined }

  return group([
    setOutput('[name].js'),
    addPlugins([
      new webpack.optimize.CommonsChunkPlugin({
        minChunks: isVendor(exclude),
        name,
      }),
    ]),
    env('production', [
      setOutput('[name].[chunkhash].js'),
      addPlugins([
        new WebpackMd5Hash(),
      ]),
    ]),
  ])
}

module.exports = splitVendor
