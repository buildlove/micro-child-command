const overrideOptimization = () => (config) => {
  // if (process.env.NODE_ENV === 'development') {
  //   return config;
  // }
  config.optimization.runtimeChunk = false;
  config.optimization.splitChunks.chunks = 'async';
  // config.optimization.minimize = false
  return config;
};

module.exports = overrideOptimization;
