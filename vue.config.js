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
        target: 'https://u.y.qq.com/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/cApi': {
        target: 'https://c.y.qq.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/cApi': ''
        },
        headers: {
          referer: 'https://y.qq.com/'
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
