const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function safeJsonParse(value, fallback) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function rafThrottle30fps(fn) {
  let last = 0;
  return (t) => {
    if (t - last < 33) return;
    last = t;
    fn(t);
  };
}

function initSparkles() {
  if (prefersReducedMotion) return;
  if (document.documentElement.dataset.sparkles === 'off') return;
  try {
    const url = new URL(window.location.href);
    if (url.searchParams.get('bg') === '0' || url.searchParams.get('bg') === 'off') return;
  } catch {
    // ignore
  }
  if (localStorage.getItem('km_sparkles') === 'off') return;

  const schedule =
    window.requestIdleCallback ||
    ((cb) => window.setTimeout(() => cb({ timeRemaining: () => 0 }), 200));

  schedule(() => {
    const canvas = document.createElement('canvas');
    canvas.className = 'bg-sparkles-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    let w = 1;
    let h = 1;
    let dpr = 1;
    const colors = [
      { r: 45, g: 252, b: 255 }, // bioCyan
      { r: 182, g: 255, b: 0 }, // toxic
      { r: 124, g: 58, b: 237 }, // uv
    ];

    const particles = [];
    const rand = (min, max) => min + Math.random() * (max - min);

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.min(240, Math.max(110, Math.round((w * h) / 12000)));
      while (particles.length < target) {
        const z = rand(0.25, 1);
        const c = colors[(Math.random() * colors.length) | 0];
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          vx: rand(-0.08, 0.08) * (1.15 - z),
          vy: rand(-0.05, 0.05) * (1.15 - z),
          tw: rand(0, Math.PI * 2),
          c,
        });
      }
      while (particles.length > target) particles.pop();
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });

    let running = document.visibilityState === 'visible';
    document.addEventListener(
      'visibilitychange',
      () => {
        running = document.visibilityState === 'visible';
      },
      { passive: true },
    );

    const renderFrame = rafThrottle30fps((t) => {
      if (!running) return;
      const tt = t * 0.001;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        const tw = 0.55 + 0.45 * Math.sin(p.tw + tt * (0.8 + (1 - p.z) * 0.8));
        const alpha = (0.06 + 0.18 * p.z) * tw;
        const size = (0.6 + 2.1 * p.z) * (0.75 + tw * 0.6);

        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.c.r},${p.c.g},${p.c.b},${alpha})`;
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Occasional “depth trail” line (cheap, subtle)
        if (p.z > 0.75 && tw > 0.9) {
          ctx.strokeStyle = `rgba(${p.c.r},${p.c.g},${p.c.b},${alpha * 0.55})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 90, p.y - p.vy * 90);
          ctx.stroke();
        }
      }

      ctx.globalCompositeOperation = 'source-over';
    });

    function loop(t) {
      renderFrame(t);
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  });
}

function initTypewriters() {
  const nodes = document.querySelectorAll('[data-typewriter]');
  if (!nodes.length) return;

  nodes.forEach((node) => {
    const words = safeJsonParse(node.getAttribute('data-words') || '[]', []);
    if (!Array.isArray(words) || words.length === 0) return;

    const speed = Number(node.getAttribute('data-speed') || '36');
    const pause = Number(node.getAttribute('data-pause') || '1400');
    const loop = node.getAttribute('data-loop') !== 'false';

    if (prefersReducedMotion) {
      node.textContent = words[0];
      return;
    }

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let nextAt = 0;

    const tick = (t) => {
      if (document.visibilityState !== 'visible') {
        requestAnimationFrame(tick);
        return;
      }
      if (t < nextAt) {
        requestAnimationFrame(tick);
        return;
      }

      const current = words[wordIndex] || '';
      if (!deleting) {
        charIndex = Math.min(charIndex + 1, current.length);
        node.textContent = current.slice(0, charIndex);
        if (charIndex >= current.length) {
          deleting = true;
          nextAt = t + pause;
        } else {
          nextAt = t + speed;
        }
      } else {
        charIndex = Math.max(charIndex - 1, 0);
        node.textContent = current.slice(0, charIndex);
        if (charIndex <= 0) {
          deleting = false;
          wordIndex = wordIndex + 1;
          if (wordIndex >= words.length) {
            if (!loop) return;
            wordIndex = 0;
          }
          nextAt = t + 320;
        } else {
          nextAt = t + Math.max(20, speed * 0.6);
        }
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  });
}

function initTerminalAutotypes() {
  const nodes = document.querySelectorAll('[data-terminal-autotype]');
  if (!nodes.length) return;

  const sleep = (ms) => new Promise((r) => window.setTimeout(r, ms));

  const defaultScript = [
    { t: 'cmd', v: 'ping kabir@voidnet.local', note: '# handshake request' },
    { t: 'out', v: '64 bytes from voidnet.local: ttl=64 time=3.2ms' },
    { t: 'cmd', v: 'trace-route --secure api-gateway', note: '# path integrity' },
    { t: 'out', v: 'route locked: dhaka -> frankfurt -> global edge' },
    { t: 'cmd', v: 'decrypt ./telemetry.bin --key=ENV', note: '# signal decode' },
    { t: 'out', v: 'telemetry: OK | anomalies: 0 | drift: 0.02%' },
    { t: 'cmd', v: 'audit --scope=auth --mode=strict', note: '# surface reduction' },
    { t: 'out', v: 'surface: minimized | rate-limit: armed | csrf: ok' },
    { t: 'cmd', v: 'render --luminous-ui --fps=stable', note: '# interface bloom' },
    { t: 'out', v: 'shader compile: ok | bloom: engaged | latency: 8ms' },
    { t: 'cmd', v: 'tail -n 3 ./signals.log', note: '# listen' },
    { t: 'out', v: '[VOID] signal clean' },
    { t: 'out', v: '[VOID] standing by' },
  ];

  const safeJsonParseLocal = (value, fallback) => safeJsonParse(value, fallback);

  nodes.forEach((node) => {
    const output = node.querySelector('[data-terminal-autotype-output]') || node;
    const loop = node.getAttribute('data-terminal-loop') !== 'false';
    const speed = Math.max(10, Number(node.getAttribute('data-terminal-speed') || '18'));

    const script = (() => {
      const raw = node.getAttribute('data-terminal-lines');
      if (!raw) return defaultScript;
      const parsed = safeJsonParseLocal(raw, null);
      return Array.isArray(parsed) && parsed.length ? parsed : defaultScript;
    })();

    const clear = () => {
      while (output.firstChild) output.removeChild(output.firstChild);
    };

    const makeLine = () => {
      const line = document.createElement('div');
      line.className = 'terminal-line';
      return line;
    };

    const addSpan = (line, text, className) => {
      const span = document.createElement('span');
      if (className) span.className = className;
      span.textContent = text;
      line.appendChild(span);
      return span;
    };

    const addCursor = (line) => {
      const cursor = document.createElement('span');
      cursor.className = 'terminal-cursor';
      cursor.setAttribute('aria-hidden', 'true');
      line.appendChild(cursor);
      return cursor;
    };

    const scrollBottom = () => {
      try {
        node.scrollTop = node.scrollHeight;
      } catch {
        // ignore
      }
    };

    const renderStatic = () => {
      clear();
      for (let i = 0; i < script.length; i++) {
        const step = script[i] || {};
        const line = makeLine();
        if (step.t === 'cmd') {
          addSpan(line, '>', 'terminal-prompt');
          addSpan(line, ` ${String(step.v || '')}`, '');
          if (step.note) addSpan(line, ` ${String(step.note)}`, 'terminal-muted');
        } else {
          addSpan(line, String(step.v || ''), '');
        }
        output.appendChild(line);
      }
      scrollBottom();
    };

    if (prefersReducedMotion) {
      renderStatic();
      return;
    }

    const schedule =
      window.requestIdleCallback ||
      ((cb) => window.setTimeout(() => cb({ timeRemaining: () => 0 }), 120));

    schedule(async () => {
      let cancelled = false;
      const onHide = () => {
        cancelled = document.visibilityState !== 'visible';
      };
      document.addEventListener('visibilitychange', onHide, { passive: true });

      const runOnce = async () => {
        clear();
        for (let i = 0; i < script.length; i++) {
          if (cancelled) {
            await sleep(320);
            i--;
            continue;
          }

          const step = script[i] || {};
          const line = makeLine();
          output.appendChild(line);

          if (step.t === 'cmd') {
            addSpan(line, '>', 'terminal-prompt');
            const text = String(step.v || '');
            const typed = addSpan(line, ' ', '');
            const cursor = addCursor(line);

            for (let c = 0; c < text.length; c++) {
              if (cancelled) break;
              typed.textContent = ` ${text.slice(0, c + 1)}`;
              scrollBottom();
              await sleep(speed + Math.random() * 22);
            }

            cursor.remove();
            if (step.note) addSpan(line, ` ${String(step.note)}`, 'terminal-muted');
            scrollBottom();
            await sleep(220 + Math.random() * 260);
          } else {
            const out = String(step.v || '');
            addSpan(line, out, '');
            scrollBottom();
            await sleep(150 + Math.random() * 220);
          }
        }
      };

      while (true) {
        await runOnce();
        if (!loop) break;
        await sleep(900 + Math.random() * 800);
      }
    });
  });
}

function initProfilePhotoModule() {
  const DEFAULT_SRC = '/profile.jpeg';

  const targets = Array.from(document.querySelectorAll('[data-profile-photo-img]'));
  if (!targets.length) return;

  const getFallback = (img) => {
    const parent = img.parentElement;
    if (!parent) return null;
    return parent.querySelector('[data-profile-photo-fallback]');
  };

  const setFallback = (img, fallback) => {
    img.removeAttribute('src');
    img.dataset.hasPhoto = 'false';
    if (fallback) fallback.style.display = '';
  };

  targets.forEach((img) => {
    const fallback = getFallback(img);
    img.dataset.hasPhoto = 'pending';
    if (fallback) fallback.style.display = '';

    img.addEventListener(
      'load',
      () => {
        img.dataset.hasPhoto = 'true';
        if (fallback) fallback.style.display = 'none';
      },
      { once: true },
    );

    img.addEventListener(
      'error',
      () => {
        setFallback(img, fallback);
      },
      { once: true },
    );

    img.src = DEFAULT_SRC;
  });
}

function initMobileMenuDrawer() {
  const button = document.querySelector('[data-mobile-menu-button]');
  const overlay = document.querySelector('[data-mobile-menu-overlay]');
  const panel = document.querySelector('[data-mobile-menu-panel]');
  if (!button || !overlay || !panel) return;

  const closeBtn = panel.querySelector('[data-mobile-menu-close]');
  const focusTarget = panel.querySelector('a,button,[tabindex]:not([tabindex="-1"])');

  const lockScroll = () => {
    document.documentElement.classList.add('is-menu-open');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
  };

  const unlockScroll = () => {
    document.documentElement.classList.remove('is-menu-open');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
  };

  const isOpen = () => document.documentElement.classList.contains('is-menu-open');

  const open = () => {
    if (isOpen()) return;
    button.setAttribute('aria-expanded', 'true');
    lockScroll();
    window.setTimeout(() => {
      focusTarget?.focus?.();
    }, 10);
  };

  const close = () => {
    if (!isOpen()) return;
    button.setAttribute('aria-expanded', 'false');
    unlockScroll();
    button.focus?.();
  };

  const toggle = () => (isOpen() ? close() : open());

  button.addEventListener('click', toggle);
  overlay.addEventListener('click', close);
  closeBtn?.addEventListener('click', close);

  panel.addEventListener('click', (e) => {
    const anchor = e.target && e.target.closest ? e.target.closest('a') : null;
    if (!anchor) return;
    close();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    close();
  });

  window.addEventListener('hashchange', close, { passive: true });
}

function initMobileTerminalDrawer() {
  const button = document.querySelector('[data-mobile-terminal-button]');
  const overlay = document.querySelector('[data-mobile-terminal-overlay]');
  const panel = document.querySelector('[data-mobile-terminal-panel]');
  if (!button || !overlay || !panel) return;

  const closeBtn = panel.querySelector('[data-mobile-terminal-close]');
  const focusTarget = panel.querySelector('button,[tabindex]:not([tabindex="-1"]),a');

  const unlockMenuIfOpen = () => {
    if (!document.documentElement.classList.contains('is-menu-open')) return;
    document.documentElement.classList.remove('is-menu-open');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.touchAction = '';

    const menuBtn = document.querySelector('[data-mobile-menu-button]');
    menuBtn?.setAttribute?.('aria-expanded', 'false');
  };

  const lockScroll = () => {
    document.documentElement.classList.add('is-terminal-open');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
  };

  const unlockScroll = () => {
    document.documentElement.classList.remove('is-terminal-open');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
  };

  const isOpen = () => document.documentElement.classList.contains('is-terminal-open');

  const open = () => {
    if (isOpen()) return;
    unlockMenuIfOpen();
    button.setAttribute('aria-expanded', 'true');
    lockScroll();
    window.setTimeout(() => focusTarget?.focus?.(), 10);
  };

  const close = () => {
    if (!isOpen()) return;
    button.setAttribute('aria-expanded', 'false');
    unlockScroll();
    button.focus?.();
  };

  const toggle = () => (isOpen() ? close() : open());

  button.addEventListener('click', toggle);
  overlay.addEventListener('click', close);
  closeBtn?.addEventListener('click', close);

  window.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    close();
  });
}

function init() {
  initSparkles();
  initTypewriters();
  initTerminalAutotypes();
  initMobileMenuDrawer();
  initMobileTerminalDrawer();
  initProfilePhotoModule();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
