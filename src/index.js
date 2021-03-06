// @flow
import { group, env, addPlugins, setOutput } from '@webpack-blocks/webpack'
import webpack from 'webpack'
import WebpackMd5Hash from 'webpack-md5-hash'
import { isVendor } from './utils'
import type { Options } from './types'

/**
 * Returns a webpack block that splits vendor javascript bundle.
 */
const splitVendor = (options: string | Options): Function => {
  const {
    name = 'vendor',
    test = /\.js$/,
    exclude,
  } = typeof options === 'object' ? options : ({ name: options }: Options)

  return group([
    setOutput({
      filename: '[name].js',
    }),
    addPlugins([
      new webpack.optimize.CommonsChunkPlugin({
        name,
        minChunks: ({ resource }) => isVendor(resource, test, exclude),
      }),
    ]),
    env('production', [
      setOutput({
        filename: '[name].[chunkhash].js',
      }),
      addPlugins([
        new WebpackMd5Hash(),
      ]),
    ]),
  ])
}

module.exports = splitVendor
