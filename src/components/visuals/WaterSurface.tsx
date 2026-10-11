import { useEffect, useRef } from 'react';

/* ---------------------------------------------------------------------------
 * WaterSurface
 *
 * A still, pale-green reflecting pool rendered on canvas. Light glints along
 * horizontal ripple lines; moving the pointer across it pushes outward rings
 * that decay, the way a touched water surface behaves.
 *
 * Deliberately restrained — it is a material, not a spectacle:
 *   - draws only inside its own band, never behind body copy
 *   - pauses when scrolled out of view or the tab is hidden
 *   - renders one static frame under prefers-reduced-motion
 * ------------------------------------------------------------------------- */

type Ripple = { x: number; y: number; born: number; strength: number };

const LINE_COUNT = 26;
const RIPPLE_LIFETIME = 2600;
const MAX_RIPPLES = 14;

export default function WaterSurface({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;
    let start = performance.now();
    const ripples: Ripple[] = [];

    /* --- Sizing ---------------------------------------------------------- */

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    /* --- Drawing --------------------------------------------------------- */

    const draw = (now: number) => {
      const time = (now - start) / 1000;
      context.clearRect(0, 0, width, height);

      /* Pool base: pale green at the waterline fading to white at depth. */
      const base = context.createLinearGradient(0, 0, 0, height);
      base.addColorStop(0, 'rgba(221, 243, 223, 0.95)');
      base.addColorStop(0.45, 'rgba(238, 248, 239, 0.7)');
      base.addColorStop(1, 'rgba(255, 255, 255, 0)');
      context.fillStyle = base;
      context.fillRect(0, 0, width, height);

      /* Ripple lines. Each line is a sine whose phase drifts with time; the
         amplitude grows with depth so the surface reads as receding. */
      for (let index = 0; index < LINE_COUNT; index += 1) {
        const progress = index / (LINE_COUNT - 1);
        const y = progress * height;
        const depth = Math.pow(progress, 1.5);

        const amplitude = 1.1 + depth * 7;
        const frequency = 0.0042 + progress * 0.004;
        const speed = 0.34 + progress * 0.42;
        const phase = time * speed + index * 0.55;

        /* Light fades with depth, brightest just under the waterline. */
        const alpha = (1 - progress) * 0.5 * (0.45 + 0.55 * Math.sin(phase * 0.6 + index));

        context.beginPath();
        for (let x = 0; x <= width; x += 8) {
          let offset =
            Math.sin(x * frequency + phase) * amplitude +
            Math.sin(x * frequency * 2.3 - phase * 1.4) * amplitude * 0.35;

          /* Pointer rings displace the lines they pass through. */
          for (const ripple of ripples) {
            const age = (now - ripple.born) / RIPPLE_LIFETIME;
            if (age >= 1) continue;

            const distance = Math.hypot(x - ripple.x, y - ripple.y);
            const radius = age * 320;
            const band = Math.abs(distance - radius);

            if (band < 70) {
              const falloff = (1 - band / 70) * (1 - age) * ripple.strength;
              offset += Math.sin((distance - radius) * 0.09) * falloff * 13;
            }
          }

          const pointY = y + offset;
          if (x === 0) context.moveTo(x, pointY);
          else context.lineTo(x, pointY);
        }

        context.strokeStyle = `rgba(255, 255, 255, ${Math.max(0, alpha).toFixed(3)})`;
        context.lineWidth = 1 + depth * 0.9;
        context.stroke();

        /* A faint green counter-line gives the water some body. */
        if (index % 3 === 0) {
          context.strokeStyle = `rgba(47, 106, 61, ${(0.05 * (1 - progress)).toFixed(3)})`;
          context.lineWidth = 1;
          context.stroke();
        }
      }

      /* Bright meniscus along the waterline. */
      const lip = context.createLinearGradient(0, 0, 0, 3);
      lip.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      lip.addColorStop(1, 'rgba(255, 255, 255, 0)');
      context.fillStyle = lip;
      context.fillRect(0, 0, width, 3);
    };

    /* --- Loop ------------------------------------------------------------ */

    const tick = (now: number) => {
      /* Retire spent ripples so the array cannot grow without bound. */
      for (let index = ripples.length - 1; index >= 0; index -= 1) {
        if ((now - ripples[index].born) / RIPPLE_LIFETIME >= 1) ripples.splice(index, 1);
      }

      draw(now);
      frame = requestAnimationFrame(tick);
    };

    const play = () => {
      if (running || reduceMotion) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const pause = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(frame);
    };

    /* --- Interaction ----------------------------------------------------- */

    let lastRipple = 0;

    const addRipple = (clientX: number, clientY: number, strength: number) => {
      if (reduceMotion) return;

      const now = performance.now();
      if (now - lastRipple < 90) return;
      lastRipple = now;

      const rect = canvas.getBoundingClientRect();
      const y = clientY - rect.top;

      /* Ignore pointer movement above the waterline. */
      if (y < -40) return;

      ripples.push({ x: clientX - rect.left, y, born: now, strength });
      if (ripples.length > MAX_RIPPLES) ripples.shift();
    };

    const onPointerMove = (event: PointerEvent) => addRipple(event.clientX, event.clientY, 0.55);
    const onPointerDown = (event: PointerEvent) => addRipple(event.clientX, event.clientY, 1);

    /* --- Wiring ---------------------------------------------------------- */

    resize();
    draw(performance.now());

    const observer = new ResizeObserver(() => {
      resize();
      if (!running) draw(performance.now());
    });
    observer.observe(canvas);

    /* Only animate while the pool is actually on screen. */
    const visibility = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? play() : pause()),
      { threshold: 0 },
    );
    visibility.observe(canvas);

    const onVisibilityChange = () => {
      if (document.hidden) pause();
      else {
        start = performance.now() - (performance.now() - start);
        play();
      }
    };

    /* Listen on the parent so ripples trigger from the whole hero, not only
       the strip of canvas itself. */
    const surface = canvas.parentElement ?? canvas;
    surface.addEventListener('pointermove', onPointerMove, { passive: true });
    surface.addEventListener('pointerdown', onPointerDown, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      pause();
      observer.disconnect();
      visibility.disconnect();
      surface.removeEventListener('pointermove', onPointerMove);
      surface.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`block h-full w-full ${className}`}
    />
  );
}
