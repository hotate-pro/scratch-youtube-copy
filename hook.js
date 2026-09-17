(() => {
  const originalFetch = window.fetch;

  function log(message) {
    console.log('[ScratchYouTube]', message);
    const box = document.getElementById('log');
    if (box) box.textContent += message + '\n';
  }

  window.fetch = async function (...args) {
    const request = args[0];
    let url = '';

    if (typeof request === 'string') {
      url = request;
    } else if (request instanceof Request) {
      url = request.url;
    }

    log('✓ FETCH DETECTED');
    log('URL: ' + url);
    log('');

    if (
      url.startsWith('https://translate-service.scratch.mit.edu/translate') ||
      url.startsWith('https://synthesis-service.scratch.mit.edu/synth')
    ) {
      log('🎯 TARGET REQUEST!');

      try {
        const parsed = new URL(url);
        log('text = ' + parsed.searchParams.get('text'));
      } catch (e) {
        log('URL parse error: ' + e);
      }

      log('');
    }

    return originalFetch.apply(this, args);
  };

  window.__scratchYouTubeFetchHook = true;
  log('✓ fetch hook installed!');
})();
