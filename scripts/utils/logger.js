import chalk from 'chalk'

export const processLog = (proc, data) => {
  const spliter = new Array((19 - proc.length) + 1).join('-')
  let log = chalk.yellow.bold(`${spliter} ${proc} Process ${spliter} \n\n`)

  if (typeof data === 'object') {
    data.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
      warnings: false,
      excludeAssets: [/(node_modules|static|bin)/, /\.(map|hot-update)(\?.*)?$/]
    }).split(/\r?\n/).forEach(line => {
      log += `  ${line}\n`
    })
  } else {
    log += `  ${data}\n`
  }

  log += chalk.yellow.bold(`\n${new Array(45).join('-')}\n`)

  console.log(log)
}

export const electronLog = data => {
  let log = ''
  data = data.toString().split(/\r?\n/)
  data.forEach(line => {
    log += `  ${line}\n`
  })
  if (/[0-9A-z]+/.test(log)) {
    console.log(log)
  }
}
