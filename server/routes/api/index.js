const express = require('express')

const router = express.Router()
const fs = require('fs')
const path = require('path')
const models = require('../../models/index')

module.exports = function (passport) {
  /**
   * Auto-import all files from './routes' directory
   */
  fs
    .readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0 && (file !== 'index.js')))
    .forEach((file) => {
      require(path.join(__dirname, file))(router, models, passport)
    })

  return router
}
