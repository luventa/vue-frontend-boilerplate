import chalk from 'chalk'
import Koa from 'koa'
import { spawn } from 'child_process'
import webpack from 'webpack'
import clientConfig from './webpack.dev.conf'
import { env, dev, source as src } from './config'
import { processLog, electronLog } from './utils/logger'
// import registerApi from '../src/server/register'
import chafMiddleware from './middlewares/chafMiddleware'
import devMiddleware from './middlewares/devMiddleware'
import hotMiddleware from './middlewares/hotMiddleware'
import proxyMiddlewares from './middlewares/proxyMiddleware'
import staticMiddleware from './middlewares/staticMiddleware'

let electronProcess = null
let manualRestart = false

const compileClient = () => {
  return new Promise(resolve => {
    const app = new Koa()
    const compiler = webpack(clientConfig)

    compiler.plugin('done', stats => {
      processLog('Client', stats)
    })

    app.env = 'development'

    proxyMiddlewares.forEach(proxyMiddleware => {
      app.use(proxyMiddleware)
    })

    app.use(chafMiddleware)
    app.use(devMiddleware(compiler))
    app.use(hotMiddleware(compiler))

    if (!dev.nodeServerEnabled) {
      app.use(staticMiddleware('/static', src.static))
    } else {
      console.log(chalk.yellow('> Registering server Api \n'))
      // registerApi(app)
      serverHotReload()
    }

    app.listen(dev.port, err => {
      if (err) {
        console.log(chalk.red(err))
        return
      }

      console.log(chalk.green(`> Dev server Listening at ${dev.port} \n`))
      resolve()
    })
  })
}

const compileElectron = () => {
  const electronConfig = require('./webpack.electron.conf').default

  return new Promise(resolve => {
    const compiler = webpack(electronConfig)
    compiler.plugin('watch-run', (compilation, done) => {
      console.log('> Compiling Main Process \n')
      done()
    })

    compiler.watch({}, (err, stats) => {
      if (err) {
        console.log(err)
        return
      }

      processLog('Main', stats)

      if (electronProcess && electronProcess.kill) {
        manualRestart = true
        process.kill(electronProcess.pid)
        electronProcess = null
        launchElectron()

        setTimeout(() => {
          manualRestart = false
        }, 5000)
      }

      resolve()
    })
  })
}

const serverHotReload = () => {
  const watcher = require('chokidar').watch(src.server)

  watcher.on('ready', () => {
    watcher.on('all', (err, file) => {
      if (err) {
        console.error(err)
        return
      }

      if (dev.hotApiRegex.test(file)) {
        console.log(chalk.yellow('> Reloading hot modules of server... \n'))
        Object.keys(require.cache).forEach(id => {
          if (dev.hotApiRegex.test(id)) delete require.cache[id]
        })
        console.log(chalk.green('> Hot modules of server are reloaded... \n'))
      }
    })
  })
}

const launchElectron = () => {
  const electron = require('electron')
  console.log('> Launching Electron')
  electronProcess = spawn(electron, ['--inspect=5858', '.'])

  electronProcess.stdout.on('data', data => {
    electronLog(data, 'blue')
  })
  electronProcess.stderr.on('data', data => {
    electronLog(data, 'red')
  })

  electronProcess.on('close', () => {
    if (!manualRestart) process.exit()
  })
}

if (env.is_web) {
  compileClient().then(() => {
    const uri = 'http://localhost:' + dev.port

    // automatically open default browser
    if (dev.autoOpen) {
      require('opn')(uri)
    }
  }).catch(err => {
    console.error(err)
  })
} else {
  Promise.all([compileClient(), compileElectron()]).then(() => {
    launchElectron()
  }).catch(err => {
    console.error(err)
  })
}
