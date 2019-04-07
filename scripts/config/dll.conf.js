'use strict'

const path = require('path')
const { dependencies } = require('../../package.json')
const whiteList = [
  'animate.css',
  'hover.css',
  'core-js'
]

const moduleMap = {
  vue: 'vue/dist/vue.esm.js'
}

module.exports = {
  output: path.resolve('src/static/dll'),
  modules: Object.keys(dependencies).filter(dep => whiteList.indexOf(dep) < 0).map(dep => moduleMap[dep] || dep),
  gzipExtensions: ['js', 'css']
}
