const path = require('path')
module.exports = {
  runtimeCompiler: true,
  // configureWebpack: {},
  pluginOptions: {
    'style-resources-loader': {
      'patterns': [ path.resolve(__dirname, 'src/assets/scss/variables') ]
    }
  },
  devServer: {
    proxy: 'http://localhost:3000'
  }
}
