'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_HOST:'"https://ladybird.awservice.net"',
  ETC_HOST:'"http://qm.awservice.net/#myETC"'
})
