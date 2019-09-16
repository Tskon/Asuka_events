const path = require('path')
module.exports = {
  runtimeCompiler: true,
  // configureWebpack: {},
  pluginOptions: {
    'style-resources-loader': {
      patterns: [
        'E:\\Development\\PhpstormProjects\\Asuka_events\\src\\assets\\scss\\variables'
      ],
      preProcessor: 'scss'
    }
  },
  devServer: {
    proxy: 'http://localhost:3000'
  }
}
