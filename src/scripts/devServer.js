function proxyRule(key, targetUrl) {
  return {
    target: targetUrl,
    changeOrigin: true,
    secure: true, // https
    logLevel: "debug", // 开启代理日志
    ws: true,
    port: 8866,
    pathRewrite: {
      [`^${key}`]: targetUrl,
    },
  };
}

function devServer() {
  console.log(
    "process.env.VUE_APP_CENTER_SERVE_URL",
    process.env.VUE_APP_CENTER_SERVE_URL,
    process.env.VUE_APP_ENV,
    process.env.NODE_ENV
  );
  return {
    compress: true,
    open: true,
    hot: true, // 热更新
    overlay: {
      warnings: false,
      errors: true,
    },
    logLevel: "debug",
    proxy: {
      "/center": {
        ...proxyRule("/center", process.env.VUE_APP_CENTER_SERVE_URL),
      },
    },
  };
}

module.exports = devServer;
