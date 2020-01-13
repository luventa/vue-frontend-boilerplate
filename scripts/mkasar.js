const fs = require('fs')
const asar = require('asar')
const path = require('path')
const chalk = require('chalk')
const crypto = require('crypto')
const config = require('./config')
const manifest = require('../package.json')

console.log(chalk.yellow('\n  Be aware that this script will pack dist to an asar file for Electron!'))

try {
  fs.statSync(path.resolve(config.output.root, 'main.js'))
} catch (e) {
  console.log(e)
  console.log(chalk.red('\n  Please execute `npm run build:client (or dist:client)` first!'))
  process.exit(0)
}

const params = process.argv.slice(2)
const root = path.resolve(__dirname, '../')
const asarFile = path.resolve(config.output.build, `${params.length > 0 ? params[0] : config.project}.asar`)
const manifestFile = path.resolve(config.output.build, 'manifest.json')

asar.createPackageWithOptions(root, asarFile, {
  pattern: '/{dist/**,package.json}'
}).then(info => {
  console.log(chalk.green(`\n  Package contains ${info.bytesWritten} total bytes.`))

  const stream = fs.createReadStream(asarFile)
  const md5Hash = crypto.createHash('md5')

  stream.on('data', data => {
    md5Hash.update(data)
  })

  stream.on('end', () => {
    const info = {
      version: manifest.version,
      md5: md5Hash.digest('hex'),
      timestamp: (new Date()).getTime()
    }
    fs.writeFileSync(manifestFile, JSON.stringify(info, null, 2))
    console.log(chalk.green(`\n  Version info has been written to file ${manifestFile}`))
  })
}).catch(err => {
  console.log(chalk.red(`\n  Error occurs while creating asar package: ${err}`))
  process.exit(0)
})
