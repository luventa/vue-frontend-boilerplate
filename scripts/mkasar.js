const fs = require('fs')
const asar = require('asar')
const path = require('path')
const chalk = require('chalk')
const config = require('./config')
const params = process.argv.slice(2)
const packageName = params.length > 0 ? params[0] : config.project

console.log(chalk.yellow('\n  Be aware that this script will pack dist to an asar file for Electron!'))

const dist = path.join(__dirname, '../dist')
const main = path.resolve(dist, 'main.js')

try {
  fs.statSync(main)
} catch (e) {
  console.log(e)
  console.log(chalk.red('\n  Please execute `npm run build:client (or dist:client)` first!'))
  process.exit(0)
}

asar.createPackage(dist, `${packageName}.asar`).then(info => {
  console.log(chalk.green(`\n  ${info.bytesWritten} total bytes`))
}).catch(err => {
  console.log(chalk.red(`\n  Error occurs while creating asar package: ${err}`))
  process.exit(0)
})
