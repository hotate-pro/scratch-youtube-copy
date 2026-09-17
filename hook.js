(() => {
  const originalFetch = window.fetch;

  const addLog = (message) => {
    console.log(message);

    const write = () => {
      let box = document.getElementById('hook-log');
      if (!box) {
        box = document.createElement('pre');
        box.id = 'hook-log';
        box.style.cssText = 'margin-top:16px;padding:12px;background:#111;color:#0f0;border-radius:8px;white-space:pre-wrap;max-height:300px;overflow:auto;';
        document.body.appendChild(box);
      }
      box.textContent += message + '\n';
    };

    if (document.body) write();
    else window.addEventListener('DOMContentLoaded', write, { once: true });
  };

  window.fetch = async function (...args) {
    const request = args[0];
    let url = '';

    if (typeof request === 'string') {
      url = request;
    } else if (request instanceof Request) {
      url = request.url;
    }

    addLog('[HOOK] fetch detected\nURL: ' + url);

    if (
      url.startsWith('https://translate-service.scratch.mit.edu/translate') ||
      url.startsWith('https://synthesis-service.scratch.mit.edu/synth')
    ) {
      addLog('[HOOK] TARGET REQUEST!');

      try {
        const parsed = new URL(url);
        addLog('[HOOK] text = ' + parsed.searchParams.get('text'));
      } catch (e) {
        addLog('[HOOK] URL parse error: ' + e);
      }
    }

    return originalFetch.apply(this, args);
  };

  window.__scratchYouTubeFetchHook = true;
  addLog('[HOOK] fetch hook installed!');
})();
