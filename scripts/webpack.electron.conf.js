import { DefinePlugin } from 'webpack'
import config from './config'
import { dependencies } from '../package.json'

const { APP_UPDATER } = config.env.is_prod
  ? require('./config/prod.env')
  : require('./config/test.env')

const electronConfig = {
  entry: {
    main: ['./src/electron/main.js']
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: config.output.root
  },
  externals: [
    ...Object.keys(dependencies)
  ],
  mode: config.env.mode,
  target: 'electron-main',
  resolve: {
    extensions: ['.js', '.json', '.node']
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        include: config.source.electron,
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: { esmodules: true }
              }]
            ]
          }
        }
      },
      {
        test: /\.node$/,
        loader: 'node-loader'
      }
    ]
  },
  node: {
    __dirname: config.env.is_dev,
    __filename: config.env.is_dev
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: `'${config.env.node_env}'`,
        DEV_PORT:  config.env.is_dev ? `${config.dev.port}` : null,
        APP_UPDATER: !config.env.is_dev ? `${APP_UPDATER}` : null
      }
    })
  ]
}

if (config.env.is_dev) {
  electronConfig.plugins.push(
    new DefinePlugin({
      '__static': `"${config.source.static.replace(/\\/g, '\\\\')}"`
    })
  )
}

export default electronConfig
