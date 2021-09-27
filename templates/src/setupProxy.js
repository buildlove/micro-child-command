const proxy = require('http-proxy-middleware');
// const ip = '192.168.101.39';
const ip = '192.168.100.42';
const proxyConfig = {
  '/api': {
    target: `http://${ip}:2234`,
    changeOrigin: true,
  },
  '/staticResource': {
    target: `http://${ip}:2234`,
  },
  '/micro-apps': {
    target: `http://${ip}:2234`,
  },
};

module.exports = function (app) {
  Object.keys(proxyConfig).forEach((key) => {
    app.use(proxy(key, proxyConfig[key]));
  });
};
