'use strict'

const path = require('path')
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const config = require('./config/dll.conf')

module.exports = {
  mode: 'production',
  entry: {
    vendor: [ 'buffer', 'crypto', ...config.modules ]
  },
  output: {
    path: config.output,
    filename: '[name].dll.js',
    library: '[name]_dll'
  },
  performance: {
    hints: false
  },
  plugins:[
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.gzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    }),
    new webpack.DllPlugin({
      path: path.join(config.output, '[name].manifest.json'),
      name:'[name]_dll',
      context: __dirname
    })
  ]
}
