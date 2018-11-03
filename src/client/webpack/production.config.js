const path = require('path')
const merge = require('webpack-merge')
const {contextPath, baseConfig} = require('./base.config')

module.exports = merge(baseConfig, {
  mode: 'production'
})
