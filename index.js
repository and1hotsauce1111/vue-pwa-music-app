// const fs = require('fs')
// const path = require('path')
// const express = require('express')
// const app = express()

// app.use(express.static(path.resolve(__dirname, './dist')))
// app.get('*', function(req, res) {
//   const html = fs.readFileSync(
//     path.resolve(__dirname, './dist/index.html'),
//     'utf-8'
//   )
//   res.send(html)
// })

var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')

var app = express()
app.use(serveStatic(path.join(__dirname, 'dist')))

var port = process.env.PORT || 8000
app.listen(port)
