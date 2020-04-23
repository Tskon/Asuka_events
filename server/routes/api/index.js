const express = require('express')

const router = express.Router()
const fs = require('fs')
const path = require('path')
const models = require('../../dbModels/index')

module.exports = function (passport) {
  /**
   * Auto-import all files from directories
   */
  const getRoutesByFolder = (folder) => {
    fs
      .readdirSync(path.join(__dirname, folder))
      .filter((file) => (file.indexOf('.') !== 0 && file !== 'index.js' && file.includes('.js')))
      .forEach((file) => {
        require(path.join(__dirname, folder, file))(router, models, passport)
      })
  }

  getRoutesByFolder('common')
  getRoutesByFolder('user')
  // getRoutesByFolder('admin')
  // getRoutesByFolder('map')
  return router
}
