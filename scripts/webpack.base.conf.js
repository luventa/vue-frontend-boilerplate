import path from 'path'
import config from './config'
import { DefinePlugin, ContextReplacementPlugin, DllReferencePlugin } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { VueLoaderPlugin } from 'vue-loader'
import { resolveAssets } from './utils/asset'

const baseConfig = {
  entry: {
    app: config.env.is_web
      ? './src/client/index.js'
      : './src/client/index.electron.js'
  },
  mode: config.env.mode,
  target: config.env.target,
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm.js',
      '@': config.source.client,
      '@store': path.resolve(config.source.client, 'store'),
      '@comp': path.resolve(config.source.client, 'components'),
      '@view': path.resolve(config.source.client, 'views')
    },
    extensions: ['.js', '.vue', '.json', '.css', '.node'],
    modules: [ path.resolve('node_modules') ]
  },
  node: {
    setImmediate: false
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        include: config.source.client,
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: resolveAssets(config.is_dev ? 'img/[name].[ext]' : 'img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: resolveAssets(config.is_dev ? 'media/[name].[ext]' : 'media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: resolveAssets(config.is_dev ? 'fonts/[name].[ext]' : 'fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      appVersion: new Date().getTime(),
      title: `${config.env.is_dev ? '[DEV]' : ''} Interbank Frontend`,
      filename: 'index.html',
      template: 'src/client/index.html',
      target: process.env.TARGET,
      inject: true,
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
      }
    }),
    new ContextReplacementPlugin(/moment[\/\\]locale$/, /en|zh/),
    new DllReferencePlugin({
      context: __dirname,
      manifest:require('../src/static/dll/vendor.manifest.json')
    }),
    new VueLoaderPlugin()
  ]
}

if (!config.env.is_web) {
  baseConfig.node = {
    __dirname: config.env.is_dev,
    __filename: config.env.is_dev
  }
  baseConfig.module.rules.push({
    test: /\.node$/,
    loader: 'node-loader'
  })
}

export default baseConfig
