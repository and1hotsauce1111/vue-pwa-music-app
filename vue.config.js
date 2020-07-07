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
  pwa: {
    name: 'RockChicken Music',
    themeColor: '#ffcd32',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#ffcd32',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/sw.js'
    },
    manifestOptions: {
      name: 'RockChicken Music',
      start_url: '/index.html',
      display: 'standalone',
      background_color: '#333',
      theme_color: '#ffcd32',
      orientation: 'portrait',
      icons: [
        {
          src: './img/logo/logo@16x16.png',
          size: '16x16',
          type: 'image/png'
        },
        {
          src: './img/logo/logo@32x32.png',
          size: '32x32',
          type: 'image/png'
        },
        {
          src: './img/logo/logo@152x152.png',
          size: '152x152',
          type: 'image/png'
        },
        {
          src: './img/logo/logo@144x144.png',
          size: '144x144',
          type: 'image/png'
        },
        {
          src: './img/logo/logo@942x942.png',
          size: '942x942',
          type: 'image/png'
        }
      ]
    },
    iconPaths: {
      favicon32: './img/logo/logo@144x144.png',
      favicon16: './img/logo/logo@144x144.png',
      appleTouchIcon: './img/logo/logo@144x144.png',
      maskIcon: './img/logo/logo@144x144.png',
      msTileImage: './img/logo/logo@144x144.png'
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
