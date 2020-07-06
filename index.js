const express = require('express')
const path = require('path')
const serveStatic = require('serve-static')
// const { createProxyMiddleware } = require('http-proxy-middleware')

// 解決上線後跨域的問題
// const options = {
//   target: 'http://www.kuwo.cn/',
//   changeOrigin: true,
//   ws: true,
//   secure: false,
//   onProxyReq(proxyReq, req, res) {
//     proxyReq.setHeader('Referer', 'http://www.kuwo.cn/playlists')
//     proxyReq.setHeader(
//       'Cookie',
//       'gid=7b2e897d-3dcc-47c3-9386-721a9d000376; Hm_lvt_cdb524f42f0ce19b169a8071123a4797=1593584680; _ga=GA1.2.990725368.1593584680; _gid=GA1.2.1961500553.1593584680; Hm_lpvt_cdb524f42f0ce19b169a8071123a4797=1593593119; kw_token=X7VRWRRJBAB; _gat=1'
//     )
//     proxyReq.setHeader('csrf', 'X7VRWRRJBAB')
//   }
// }

// const proxy = createProxyMiddleware(options)

const app = express()

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

app.use('/api', proxy)
app.use(serveStatic(path.join(__dirname, 'dist')))

const port = process.env.PORT || 8000
app.listen(port)
