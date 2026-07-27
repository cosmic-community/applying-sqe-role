(function () {
  if (window.self === window.top) return;

  const logs = [];
  const MAX_LOGS = 500;

  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
    debug: console.debug
  };

  function captureLog(level, args) {
    const timestamp = new Date().toISOString();
    const message = args.map(function (arg) {
      if (typeof arg === 'object' && arg !== null) {
        try {
          return JSON.stringify(arg, function (key, value) {
            if (typeof value === 'function') return '[Function]';
            if (value instanceof Error) return value.toString();
            return value;
          }, 2);
        } catch (e) {
          return '[Object]';
        }
      }
      return String(arg);
    }).join(' ');

    const logEntry = {
      timestamp: timestamp,
      level: level,
      message: message,
      url: window.location.href
    };

    logs.push(logEntry);
    if (logs.length > MAX_LOGS) {
      logs.shift();
    }

    try {
      window.parent.postMessage({
        type: 'console-log',
        log: logEntry
      }, '*');
    } catch (e) {}
  }

  console.log = function () {
    const args = Array.prototype.slice.call(arguments);
    captureLog('log', args);
    originalConsole.log.apply(console, args);
  };

  console.warn = function () {
    const args = Array.prototype.slice.call(arguments);
    captureLog('warn', args);
    originalConsole.warn.apply(console, args);
  };

  console.error = function () {
    const args = Array.prototype.slice.call(arguments);
    captureLog('error', args);
    originalConsole.error.apply(console, args);
  };

  console.info = function () {
    const args = Array.prototype.slice.call(arguments);
    captureLog('info', args);
    originalConsole.info.apply(console, args);
  };

  console.debug = function () {
    const args = Array.prototype.slice.call(arguments);
    captureLog('debug', args);
    originalConsole.debug.apply(console, args);
  };

  window.addEventListener('error', function (event) {
    captureLog('error', [
      'Unhandled error: ' + (event.message || 'Unknown error'),
      event.filename ? event.filename + ':' + event.lineno + ':' + event.colno : ''
    ]);
  });

  window.addEventListener('unhandledrejection', function (event) {
    captureLog('error', ['Unhandled promise rejection:', event.reason]);
  });

  function sendReady() {
    try {
      window.parent.postMessage({
        type: 'console-capture-ready',
        url: window.location.href,
        timestamp: new Date().toISOString()
      }, '*');
    } catch (e) {}
  }

  function sendRouteChange() {
    try {
      window.parent.postMessage({
        type: 'route-change',
        route: {
          pathname: window.location.pathname,
          search: window.location.search,
          hash: window.location.hash,
          href: window.location.href
        },
        timestamp: new Date().toISOString()
      }, '*');
    } catch (e) {}
  }

  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function () {
    const result = originalPushState.apply(history, arguments);
    sendRouteChange();
    return result;
  };

  history.replaceState = function () {
    const result = originalReplaceState.apply(history, arguments);
    sendRouteChange();
    return result;
  };

  window.addEventListener('popstate', sendRouteChange);
  window.addEventListener('hashchange', sendRouteChange);

  if (document.readyState === 'complete') {
    sendReady();
    sendRouteChange();
  } else {
    window.addEventListener('load', function () {
      sendReady();
      sendRouteChange();
    });
  }
})();