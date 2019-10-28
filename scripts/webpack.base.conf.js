import path from 'path'
import config from './config'
import { DllReferencePlugin } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { VueLoaderPlugin } from 'vue-loader'
import { resolveAssetRules } from './utils/asset'
import vendorManifest from '../src/static/dll/vendor.manifest.json'

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
      vue: 'vue/dist/vue.esm.js',
      '@': config.source.client,
      '@store': path.resolve(config.source.client, 'store'),
      '@comp': path.resolve(config.source.client, 'components'),
      '@view': path.resolve(config.source.client, 'views')
    },
    extensions: ['.js', '.vue', '.json', '.css', '.node'],
    modules: [path.resolve('node_modules')]
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
        use: 'vue-loader'
      },
      {
        test: /\.json$/,
        use: 'json-loader',
        include: config.source.root
      },
      // Generate rules of assets, for using url-loader
      // For importing assets inside <template> of .vue files,
      // you need to use resource query [inline].
      // eg. <img src="~@/assets/images/demo.png?inline">
      ...resolveAssetRules({
        image: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        media: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        font: /\.(woff2?|eot|ttf|otf)(\?.*)?$/
      })
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      appVersion: new Date().getTime(),
      title: `${config.env.is_dev ? '[DEV]' : ''} Vue Frontend Boilerplate`,
      filename: 'index.html',
      template: 'src/client/index.html',
      target: process.env.TARGET,
      vendor: `${config.env.is_web ? '/' : ''}static/dll/${vendorManifest.name.replace(/_/g, '.')}.js`,
      inject: true,
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
      }
    }),
    new DllReferencePlugin({
      context: __dirname,
      manifest: vendorManifest
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
