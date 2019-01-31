import { DefinePlugin, HotModuleReplacementPlugin } from 'webpack'
import merge from 'webpack-merge'
import config from './config'
import baseConfig from './webpack.base.conf'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'

Object.keys(baseConfig.entry).forEach(name => {
  baseConfig.entry[name] = ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true&quiet=true&overlayWarnings=true'].concat(baseConfig.entry[name])
})

const clientConfig = {
  devtool: '#cheap-module-source-map',
  output: {
    path: config.output.root,
    filename: '[name].js',
    publicPath: config.dev.assetsPublicPath
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                modules: false,
                useBuiltIns: 'usage',
                targets: {
                  browsers: [ '> 1%', 'last 2 versions', 'ie >= 10' ]
                }
                // or only develop with modern browser
                // targets: { esmodules: true }
              }]
            ],
            plugins: [
              '@babel/plugin-syntax-dynamic-import'
            ],
            ignore: [ 'node_modules' ]
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      'process.env': require('./config/dev.env')
    }),
    new HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin()
  ]
}

// Separate config for electron and web
if (!config.env.is_web) {
  clientConfig.output.libraryTarget = 'commonjs2'
  clientConfig.plugins.push(
    new DefinePlugin({
      '__static': `"${config.source.static.replace(/\\/g, '\\\\')}"`
    })
  )
}

export default merge(baseConfig, clientConfig)
