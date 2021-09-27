import React, { useEffect, useState } from 'react';
import { loadScript, loaderCss } from './utils';
// import { logger } from '@zenview/micro-utils';
import './index.less';

// ZenMap
const ZenMapGL = '/micro-apps/micro-dep-librarys/map/zenmap/ZenMapGL.js';
const ZenMapGL_Extend = '/micro-apps/micro-dep-librarys/map/zenmap/ZenMapGL_Extend.js';
const threebox = '/micro-apps/micro-dep-librarys/map/zenmap/lib/threebox.js';
const BigScreenMap = '/micro-apps/micro-dep-librarys/map/zenmap/BigScreenMap.js';

// Gaode
const chinaApi = 'https://a.amap.com/jsapi_demos/static/china.js'
const gaodeMap = 'https://webapi.amap.com/maps?v=1.4.15&key=7d74d709d73c5aa7ed57fd7b4551376c&plugin=AMap.MarkerClusterer';

//Leaflet
const leafletMapCss = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
const leafletMap = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';

function LoaderMap({ children, fallback = null }) {
  const [isInit, setInit] = useState(false);
  useEffect(() => {
    const loader = async () => {
      // 异步导入ZenMap
      await loadScript(ZenMapGL);
      await loadScript(ZenMapGL_Extend);
      await loadScript(threebox);
      await loadScript(BigScreenMap);
      // 异步导入高德
      await loadScript(chinaApi);
      await loadScript(gaodeMap);
      // 异步导入leaflet
      await loaderCss(leafletMapCss);
      await loadScript(leafletMap);
    };
    loader()
      .then(() => setInit(true))
      // .catch((err) => logger.debug('地图加载失败！', err));
  }, []);

  return <>{isInit ? children : fallback}</>;
}

export default LoaderMap;
