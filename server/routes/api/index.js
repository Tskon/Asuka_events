const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const models = require('../../models/index')

/**
 * Auto-import all files from './routes' directory
 */
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0 && (file !== "index.js"))
  })
  .forEach(function(file) {
    require(path.join(__dirname, file))(router, models)
  });

module.exports = router;