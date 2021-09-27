const cache = {};
export function loadScript(url) {
  return new Promise((resolve, reject) => {
    if (cache[url]) {
      resolve();
    }
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.onload = function () {
      cache[url] = true;
      resolve();
    };
    script.onerror = function (err) {
      reject(err);
    };
    script.src = url;
    console.log(url)
    window._APPEND_CHILD_ ? window._APPEND_CHILD_(script) : document.head.appendChild(script);
  });
}
export const loaderCss = (href) => {
  return new Promise((resolve, reject) => {
    if (cache[href]) {
      resolve();
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = function () {
      cache[href] = true;
      resolve();
    };
    link.onerror = function (err) {
      reject(err);
    };
    window._APPEND_CHILD_ ? window._APPEND_CHILD_(link) : document.head.appendChild(link);
  });
};
