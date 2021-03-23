function resizeFontSize() {
  let dpr = 1;
  let rem = 100;
  let scale = 1;

  const { clientWidth, clientHeight } = document.documentElement;
  const docEl = document.documentElement;
  const appEl = document.querySelector('#app');
  const metaEl = document.querySelector('meta[name="viewport"]');
  const screenRatio = clientWidth / clientHeight;
  if (clientWidth > 1440 && clientHeight > 900) {
    dpr = 1 || window.devicePixelRatio; // 这里本应该用设备 dpr 但是 android webview 有 bug，scale 无效
    rem = 120;
    scale = 1.2;
  }

  if (clientWidth < 1024) {
    let activeResolution = clientWidth;
    let baseResolution = 1024;
    if (screenRatio * 3 > 4) {
      activeResolution = clientHeight;
      baseResolution = 768;
    }
    rem = Math.round((activeResolution / baseResolution) * 100);
  }

  if (metaEl) {
    metaEl.setAttribute(
      'content',
      `width=${dpr * docEl.clientWidth},initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale},user-scalable=no`
    );
  }

  docEl.setAttribute('data-dpr', dpr + '');
  // 动态写入样式
  if (appEl) {
    docEl.style.fontSize = `${rem}px`;
  }
}

/** resize 时动态调整 rem */
export function fontResize() {
  let timer = 0;
  function delay() {
    clearTimeout(timer);
    timer = window.setTimeout(resizeFontSize, 100);
  }

  window.addEventListener('load', resizeFontSize);
  window.addEventListener('resize', delay);
  timer = window.setTimeout(resizeFontSize, 300);
  resizeFontSize();

  return function () {
    window.removeEventListener('load', resizeFontSize);
    window.removeEventListener('resize', delay);
  };
}
