import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { logger } from '@zenview/micro-utils';
import * as serviceWorker from './serviceWorker';
import { IconFont } from '@zenview/micro-components';
import './public-path';
import './index.less';

IconFont.registerIconFont('/micro-apps/micro-dep-librarys/font/icon-font.js');

function render({ container, ...props }) {
  // window._IS_RUN_MICRO_BASIC ? <App {...props} /> : <InitialConfig>{(isUpdate) => (!isUpdate ? <App {...props} /> : null)}</InitialConfig>
  ReactDOM.render(
    <App {...props} />,
    container ? container.querySelector('#demoMap') : document.querySelector('#demoMap')
  );
}

window._IS_RUN_MICRO_MODULE = true;

if (!window._IS_RUN_MICRO_BASIC) {
  render({});
}

export async function bootstrap() {
  logger.debug('micro-demo-map app bootstraped');
}

export async function mount(props) {
  logger.debug('micro-demo-map app mount', props);
  render(props);
}

export async function update(props) {
  logger.debug('micro-demo-map app update', props);
  render(props);
}

export async function unmount(props) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#demoMap') : document.querySelector('#demoMap'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
