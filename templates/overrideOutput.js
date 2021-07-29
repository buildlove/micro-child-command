const path = require('path');
const { name } = require(path.join(process.cwd(), './package.json'));

const argv = process.argv.slice(2);
const paramsMap = {};
argv.map((v) => v.split('=')).forEach((v) => (paramsMap[v[0]] = v[1]));

const PORT = parseInt(process.env.PORT, 10) || 3000;

const overrideOutput = () => (config) => {
  delete config.output.chunkFilename;
  config.output.filename = `static/js/${name}.js`;
  config.output.library = `${name}-[name]`;
  config.output.libraryTarget = 'umd';
  config.output.jsonpFunction = `webpackJsonp_${name}`;
  //修改
  config.output.publicPath = process.env.NODE_ENV !== 'development' ? paramsMap['public-path'] || `/micro-apps/${name}/` : `/`;
  console.log('public-path ->', config.output.publicPath);
  return config;
};

module.exports = overrideOutput;
