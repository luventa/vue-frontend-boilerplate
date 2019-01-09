import chalk from'chalk'
import { description, scripts } from '../../package.json'

console.log([
  chalk.cyanBright.bold.underline('Description\n'),
  chalk.cyanBright(description)
].join('\n'))