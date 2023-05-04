const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/charting_library",
    createProxyMiddleware({
      target: "https://app.tealstreet.io/",
      changeOrigin: true,
    })
  );
};
