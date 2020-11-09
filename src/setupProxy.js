const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://apiko-intensive-backend.herokuapp.com/',
      pathRewrite: {
        '^/api': '',
      },
      changeOrigin: true,
    }),
  );
};
