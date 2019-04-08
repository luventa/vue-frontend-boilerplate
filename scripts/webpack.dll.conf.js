const path = require('path')
const { DllPlugin, DefinePlugin, ContextReplacementPlugin } = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const config = require('./config/dll.conf')

const dllConfig = {
  mode: 'production',
  entry: {
    vendor: [ 'buffer', 'crypto', ...config.modules ]
  },
  output: {
    path: config.output,
    filename: '[name].[chunkhash:8].dll.js',
    library: '[name]_[chunkhash:8]_dll'
  },
  performance: {
    hints: false
  },
  plugins: [
    /* eslint-disable no-useless-escape */
    new ContextReplacementPlugin(/moment[\/\\]locale$/, /en|zh/),
    /* eslint-enable no-useless-escape */
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
    new DllPlugin({
      name: '[name]_[chunkhash:8]_dll',
      path: path.join(config.output, '[name].manifest.json'),
      context: __dirname
    })
  ]
}

if (process.argv.includes('--dev')) {
  dllConfig.plugins.push(
    new DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    })
  )
}

module.exports = dllConfig
