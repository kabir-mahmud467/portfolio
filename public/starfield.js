// Three.js starfield background loaded via CDN import (no bundling).
// Runs behind the UI overlays and respects reduced-motion / bg=off toggles.

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function shouldDisable() {
  if (prefersReducedMotion) return true;
  try {
    const url = new URL(window.location.href);
    const bg = url.searchParams.get("bg");
    if (bg === "0" || bg === "off") return true;
  } catch {
    // ignore
  }
  return false;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

async function boot() {
  if (shouldDisable()) return;

  let THREE;
  try {
    THREE = await import("https://unpkg.com/three@0.160.0/build/three.module.js");
  } catch {
    return;
  }

  const canvas = document.createElement("canvas");
  canvas.className = "starfield-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
  } catch {
    canvas.remove();
    return;
  }

  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(clamp(window.devicePixelRatio || 1, 1, 1.6));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1200);
  camera.position.set(0, 0, 120);

  // Stars
  const starCount = 1800;
  const positions = new Float32Array(starCount * 3);
  const colors = new Float32Array(starCount * 3);

  const colorA = new THREE.Color("#2dfcff");
  const colorB = new THREE.Color("#7c3aed");
  const colorC = new THREE.Color("#b6ff00");
  const mix = (a, b, t) => a * (1 - t) + b * t;

  for (let i = 0; i < starCount; i++) {
    // Random in a loose sphere shell
    const r = 260 + Math.random() * 520;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    positions[i * 3 + 0] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    const t = Math.random();
    const u = Math.random();
    const base = t < 0.6 ? colorA : t < 0.9 ? colorB : colorC;
    const target = u < 0.5 ? colorB : colorA;
    const col = base.clone().lerp(target, Math.random() * 0.5);
    colors[i * 3 + 0] = col.r;
    colors[i * 3 + 1] = col.g;
    colors[i * 3 + 2] = col.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 1.2,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.72,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const stars = new THREE.Points(geometry, material);
  scene.add(stars);

  // Nebula-ish fog layer (cheap and subtle)
  const fogGeometry = new THREE.SphereGeometry(540, 24, 24);
  const fogMaterial = new THREE.MeshBasicMaterial({
    color: 0x341a6b,
    transparent: true,
    opacity: 0.06,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.BackSide,
  });
  const fog = new THREE.Mesh(fogGeometry, fogMaterial);
  scene.add(fog);

  let w = 1;
  let h = 1;
  function resize() {
    w = Math.max(1, window.innerWidth);
    h = Math.max(1, window.innerHeight);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }
  resize();
  window.addEventListener("resize", resize, { passive: true });

  let targetRX = 0;
  let targetRY = 0;
  let pointerActive = false;

  window.addEventListener(
    "pointermove",
    (e) => {
      pointerActive = true;
      const nx = (e.clientX / w) * 2 - 1;
      const ny = (e.clientY / h) * 2 - 1;
      targetRY = nx * 0.08;
      targetRX = -ny * 0.06;
    },
    { passive: true },
  );

  let running = document.visibilityState === "visible";
  document.addEventListener(
    "visibilitychange",
    () => {
      running = document.visibilityState === "visible";
    },
    { passive: true },
  );

  let t0 = performance.now();
  function frame(t) {
    if (!running) {
      requestAnimationFrame(frame);
      return;
    }

    const dt = Math.min(0.05, (t - t0) / 1000);
    t0 = t;

    stars.rotation.y += dt * 0.02;
    stars.rotation.x += dt * 0.008;
    fog.rotation.y -= dt * 0.006;

    // Smooth parallax
    const ease = pointerActive ? 0.06 : 0.02;
    stars.rotation.x = mix(stars.rotation.x, stars.rotation.x + targetRX, ease);
    stars.rotation.y = mix(stars.rotation.y, stars.rotation.y + targetRY, ease);

    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}

