import { LMConfig } from '@zenview/micro-basic-library';

export default function getConfigs() {
  let configs = {};
  if (process.env.NODE_ENV === 'development') {
    const hotConfigs = require('./hotConfig').default;
    configs = { ...LMConfig.AppConfig, ...hotConfigs };
  } else {
    configs = LMConfig.AppConfig;
  }
  return configs;
}

export function getConfigList() {
  return Object.values(getConfigs()).map((item) => ({
    name: item.name,
    container: '#subapp-container',
    entry: {
      scripts: [item.script],
      html: `<div id="subapp-${item.name}">${item.style ? `<link rel="stylesheet" href="${item.style}">` : ''}<div id="${item.name}"></div></div>`,
    },
  }));
}

export const getSubAppConfig = (appName) => getConfigs()[appName]
