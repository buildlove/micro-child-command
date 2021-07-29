const { override, addLessLoader, adjustWorkbox, addBabelPlugin, addDecoratorsLegacy, overrideDevServer, addWebpackAlias } = require('customize-cra');
const overrideOutput = require('./overrideOutput');
const overrideOptimization = require('./overrideOptimization');
const path = require('path');

const _BASE_PLUGNS = [
  overrideOutput(),
  addWebpackAlias({
    react: path.resolve('./node_modules/react'),
    '@src': path.resolve('./src')
  }),
  addBabelPlugin(['import', { libraryName: 'antd', style: 'css' }, 'antd']),
  addDecoratorsLegacy(),
  adjustWorkbox(wb =>
    Object.assign(wb, {
      skipWaiting: true
    })
  ),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars:{'@primary-color':'#1DA57A'},
    }
  })
]

const basicPlugs = _BASE_PLUGNS;
const appPlugs = [..._BASE_PLUGNS, overrideOptimization()];

module.exports = {
  webpack: override(...appPlugs),
  basicWebpack: override(...basicPlugs),
  devServer: overrideDevServer((config) => {
    config.headers = {
      'Access-Control-Allow-Origin': '*',
    };
    config.historyApiFallback = true;
    config.hot = false;
    config.hotOnly = false;
    config.watchContentBase = false;
    // config.liveReload = false;
    return config;
  }),
}
