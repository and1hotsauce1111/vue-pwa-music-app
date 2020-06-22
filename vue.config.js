const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        common: resolve('src/common'),
        components: resolve('src/components'),
        api: resolve('src/api'),
        base: resolve('src/base')
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://u.y.qq.com/cgi-bin/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/qqapi': {
        target: 'https://api.zsfmyz.top/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/qqapi': ''
        }
      }
    }
  }
}
