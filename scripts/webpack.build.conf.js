import path from 'path'
import { DefinePlugin, LoaderOptionsPlugin } from 'webpack'
import CompressionWebpackPlugin from 'compression-webpack-plugin'
import merge from 'webpack-merge'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import config from './config'
import baseConfig from './webpack.base.conf'
import { resolveAssets, resolveFileName } from './utils/asset'

const clientConfig = {
  output: {
    path: config.output.root,
    publicPath: config.build.assetsPublicPath,
    filename: resolveAssets('js/[name].[chunkhash].js'),
    chunkFilename: resolveAssets('js/[id].[chunkhash].js')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
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
              resources: config.source.styleResources
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: resolveFileName('css', '[contenthash]')
    }),
    new DefinePlugin({
      'process.env': config.env.is_prod
        ? require('./config/prod.env')
        : require('./config/test.env')
    })
  ]
}

// Separate config for electron and web
if (config.env.target === 'electron-renderer') {
  clientConfig.output = {
    path: config.output.root,
    libraryTarget: 'commonjs2',
    filename: resolveFileName('js'),
    chunkFilename: resolveFileName('js')
  }
  clientConfig.module.rules.push({
    test: /\.(m?js|jsx)$/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', {
            targets: { esmodules: true }
          }]
        ],
        plugins: [ '@babel/plugin-syntax-dynamic-import' ],
        ignore: [ 'node_modules' ]
      }
    }
  })
  clientConfig.plugins.push(
    new CopyWebpackPlugin([
      {
        from: config.source.static,
        to: path.resolve(config.output.root, 'static'),
        ignore: ['.*']
      }
    ])
  )
} else {
  // Babel config for web app
  clientConfig.module.rules.push({
    test: /\.(m?js|jsx)$/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', {
            modules: false,
            useBuiltIns: 'usage',
            corejs: 2,
            targets: {
              browsers: [ '> 1%', 'last 2 versions', 'ie >= 8' ]
            }
          }]
        ],
        plugins: [ '@babel/plugin-syntax-dynamic-import' ],
        ignore: [ 'node_modules' ]
      }
    }
  })
  // Static resource relocate and built resources minimize
  clientConfig.plugins.push(
    new CopyWebpackPlugin([{
      from: config.source.static,
      to: config.output.static,
      ignore: ['.*']
    }]),
    new LoaderOptionsPlugin({
      minimize: true
    }),
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (process.env.MODE === 'analyze') {
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
  clientConfig.plugins.push(new BundleAnalyzerPlugin())
}

export default merge(baseConfig, clientConfig)
