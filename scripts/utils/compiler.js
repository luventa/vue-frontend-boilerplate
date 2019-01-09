import webpack from 'webpack'

export const compile = config => {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) {
        reject(err.stack || err)
      } else if (stats.hasErrors()) {
        reject(stats.toString({
          chunks: false,
          colors: true
        }).split(/\r?\n/).join('\n'))
      } else {
        resolve(stats)
      }
    })
  })
}
