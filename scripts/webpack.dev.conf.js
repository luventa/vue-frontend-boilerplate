import { DefinePlugin, HotModuleReplacementPlugin } from 'webpack'
import StyleLintPlugin from 'stylelint-webpack-plugin'
import merge from 'webpack-merge'
import config from './config'
import baseConfig from './webpack.base.conf'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'

// Dependency electron-store:conf:write-file-atomic wraps require('worker_threads') with try...catch
// These code will throw a warning that interrupt developing with electron.
const hmrOptions = {
  path: '/__webpack_hmr',
  timeout: 20000,
  reload: true,
  quiet: true,
  overlayWarnings: config.env.is_web
}
const hmrOptionString = Object.keys(hmrOptions).map(key => `${key}=${hmrOptions[key]}`).join('&')

Object.keys(baseConfig.entry).forEach(name => {
  baseConfig.entry[name] = [`webpack-hot-middleware/client?${hmrOptionString}`].concat(baseConfig.entry[name])
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
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          // Inject a scss variable to distinguish plateform.
          // platform: web | electron
          {
            loader: 'sass-loader',
            options: {
              data: `$platform: ${process.env.TARGET};`
            }
          },
          // Makes scss variables inside scss file(s) global.
          {
            loader: 'sass-resources-loader',
            options: {
              sourceMap: true,
              resources: config.source.styleResources
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new StyleLintPlugin({
      files: ['src/client/**/*.vue', 'src/client/**/*.s?(a|c)ss'],
      cache: true,
      emitErrors: true,
      failOnError: false
    }),
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
