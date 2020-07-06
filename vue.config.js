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
        target: 'http://www.kuwo.cn/',
        changeOrigin: true,
        ws: true,
        secure: false,
        onProxyReq(proxyReq, req, res) {
          proxyReq.setHeader('Referer', 'http://www.kuwo.cn/playlists')
          proxyReq.setHeader(
            'Cookie',
            'gid=7b2e897d-3dcc-47c3-9386-721a9d000376; Hm_lvt_cdb524f42f0ce19b169a8071123a4797=1593584680; _ga=GA1.2.990725368.1593584680; _gid=GA1.2.1961500553.1593584680; Hm_lpvt_cdb524f42f0ce19b169a8071123a4797=1593593119; kw_token=X7VRWRRJBAB; _gat=1'
          )
          proxyReq.setHeader('csrf', 'X7VRWRRJBAB')
        }
      }
    }
  }
}
