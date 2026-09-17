(() => {
  const originalFetch = window.fetch;

  window.fetch = async function (...args) {
    const request = args[0];
    let url = '';

    if (typeof request === 'string') {
      url = request;
    } else if (request instanceof Request) {
      url = request.url;
    }

    console.log('[ScratchYouTube] FETCH:', url);

    if (
      url.startsWith('https://translate-service.scratch.mit.edu/translate') ||
      url.startsWith('https://synthesis-service.scratch.mit.edu/synth')
    ) {
      console.log('[ScratchYouTube] TARGET REQUEST!');

      try {
        const parsed = new URL(url);
        console.log('[ScratchYouTube] text =', parsed.searchParams.get('text'));
      } catch (e) {
        console.error('[ScratchYouTube] URL parse error:', e);
      }
    }

    return originalFetch.apply(this, args);
  };

  window.__scratchYouTubeFetchHook = true;
  console.log('[ScratchYouTube] fetch hook installed!');
})();
