const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    proxy('/ethgasAPI', {
      target: 'https://ethgasstation.info/json/ethgasAPI.json',
      changeOrigin: true,
      pathRewrite: {
        '^/ethgasAPI': '',
      },
      secure: false,
    }),
  )
}
