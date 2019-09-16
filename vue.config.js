const path = require('path')
module.exports = {
  runtimeCompiler: true,
  // configureWebpack: {},
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/assets/scss/variables.scss')
      ]
    }
  },
  devServer: {
    proxy: 'http://localhost:3000'
  }
}
