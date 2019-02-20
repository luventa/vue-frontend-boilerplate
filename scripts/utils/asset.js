import path from 'path'
import merge from 'webpack-merge'
import { env, dev, build } from '../config'

const assetsSubDirectory = env.is_dev
  ? dev.assetsSubDirectory
  : build.assetsSubDirectory

export const resolveAssets = _path => path.posix.join(assetsSubDirectory, _path)

export const getNameResolver = (subPath, hashMode = '[hash:7]', ext = '[ext]') => {
  let subDirectory = subPath ? `${subPath}/` : ''

  return file => {
    if (env.is_web) {
      return env.is_dev
        ? resolveAssets(`${subDirectory}[name].${ext}`)
        : resolveAssets(`${subDirectory}[name].${hashMode}.${ext}`)
    } else {
      return `${assetsSubDirectory}/${subDirectory}[name].${ext}`
    }
  }
}

export const resolveAssetRules = assetsMap => (
  Object.keys(assetsMap).map(assetType => {
    let test = { test: assetsMap[assetType] }
    let baseRule = {
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: getNameResolver(assetType)
      }
    }

    if (env.is_web || env.is_dev) {
      return merge(test, baseRule)
    } else {
      return merge(test, {
        oneOf: [
          merge({ resourceQuery: /inline/ }, baseRule),
          merge({
            options: { publicPath: url => url.replace(assetsSubDirectory, '..') }
          }, baseRule)
        ]
      })
    }
  })
)

export const resolveFileName = (fileType, hashMode) => {
  let resolver = getNameResolver(fileType, hashMode, fileType)

  return resolver()
}
