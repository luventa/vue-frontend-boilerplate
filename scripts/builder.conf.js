const [env] = process.argv.splice(4)

const builderConfig = {
  directories: {
    buildResources: 'build',
    output: 'build'
  },
  files: [
    'dist/**/*'
  ],
  win: {
    icon: 'src/electron/logo_256.png',
    target: [{
      target: 'nsis',
      arch: ['x64', 'ia32']
    }]
  }
}

if (env && env !== '--dir') {
  builderConfig.appId = `your.application.${env}`
  builderConfig.productName = `your-productName-${env}`
  builderConfig.artifactName = '${productName}_${version}.${ext}'
  builderConfig.publish = {
    provider: 'generic',
    url: env === 'production' ? 'https://your.app.com/resources/client' : 'https://your.app-stg.com/resources/client'
  }
}

module.exports = builderConfig
