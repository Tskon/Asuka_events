const path = require('path')
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      'patterns': [ path.resolve(__dirname, 'src/assets/scss/variables') ]
    }
  }
}

module.exports = {
  runtimeCompiler: true
}