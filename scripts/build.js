import chalk from 'chalk'
import del from 'del'
import Multispinner from 'multispinner'
import config from './config'
import clientConfig from './webpack.build.conf'
import { processLog } from './utils/logger'
import { compile } from './utils/compiler'

const results = Array.apply(null)
const tasks = config.env.target !== 'web' ? ['electron', 'client'] : [ 'client' ]
const spinners = new Multispinner(tasks, {
  preText: 'packing',
  postText: 'process'
})

del.sync(['dist/*', 'build/*', '!.gitkeep'])

spinners.on('success', () => {
  process.stdout.write('\x1B[2J\x1B[0f\n\n')
  results.forEach(result => processLog(result.proc, result.stats))
  console.log(`> Webpack packing process completed`)
  console.log(`> Start to build application`)
  if (process.env.MODE !== 'analyze') {
    process.exit()
  }
})

compile(clientConfig).then(stats => {
  results.push({ proc: 'Client', stats })
  spinners.success('client')
}).catch(err => {
  spinners.error('client')
  console.log(`\n  Error: failed to pack client`)
  console.error(`\n${err}\n`)
  process.exit(1)
})

if (config.env.target !== 'web') {
  const electronConfig = require('./webpack.electron.conf').default
  compile(electronConfig).then(stats => {
    results.push({ proc: 'Electron', stats })
    spinners.success('electron')
  }).catch(err => {
    spinners.error('electron')
    console.log(`\n  Error: failed to pack electron`)
    console.error(`\n${err}\n`)
    process.exit(1)
  })
}
