import { DefinePlugin } from 'webpack'
import { env, dev, output, source as src } from './config'
import { dependencies } from '../package.json'

const { APP_UPDATER } = env.is_prod
  ? require('./config/prod.env')
  : require('./config/test.env')

const electronConfig = {
  entry: {
    main: ['./src/electron/main.js']
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: output.root
  },
  externals: [
    ...Object.keys(dependencies)
  ],
  mode: env.mode,
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
        include: src.electron,
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
    __dirname: env.is_dev,
    __filename: env.is_dev
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: `'${env.node_env}'`,
        DEV_PORT: env.is_dev ? `${dev.port}` : null,
        APP_UPDATER: !env.is_dev ? `${APP_UPDATER}` : null
      }
    })
  ]
}

if (env.is_dev) {
  electronConfig.plugins.push(
    new DefinePlugin({
      /* eslint-disable */
      '__static': `"${src.static.replace(/\\/g, '\\\\')}"`
    })
  )
}

export default electronConfig
