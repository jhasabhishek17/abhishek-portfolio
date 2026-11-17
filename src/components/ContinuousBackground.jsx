import React, { useEffect, useRef } from 'react';

/**
 * ContinuousBackground
 * 
 * Calm, eye-comfortable, continuous background animation spanning from 
 * "Engineered Works." through to the footer.
 * 
 * Features:
 * - STRICT HERO BOUNDARY: Opacity is 0.0 on the Hero section (preserves 3D hero centerpiece with zero leakage)
 * - Gentle, gradual transition into "Engineered Works."
 * - Natural soft fade-out near the bottom of the footer
 * - Lighter, restrained silver, grey, and charcoal tones (never competes with reading or content)
 * - Slow, fluid, meditative harmonic motion (no bright flashes, sudden movements, or glare)
 * - 3 Balanced Layers:
 *   1. Soft, hairline tensile filaments with gentle ambient glow (alpha ~0.22 - 0.28)
 *   2. Calm constellation web with faint proximity bonds (alpha ~0.15)
 *   3. Soft volumetric titanium depth caustics (alpha ~0.02)
 * - Viewport-fixed canvas (DPR capped at 2, lightweight, smooth, zero memory leaks)
 * - Full prefers-reduced-motion support (renders static minimal contours)
 * - pointer-events: none (zero obstruction of clicks or text selection)
 */
export default function ContinuousBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let currentOpacity = 0;
    let targetOpacity = 0;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mouse coordinates with smooth spring damping
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false
    };

    // -------------------------------------------------------------
    // Constellation Web Nodes (Calm, Restrained Density)
    // -------------------------------------------------------------
    const nodeCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 18 : 28;
    const nodes = [];

    const initNodes = () => {
      nodes.length = 0;
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25, // Slow, calm drift
          vy: (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 1.2 + 0.8,
          phase: Math.random() * Math.PI * 2,
          depth: Math.random() * 0.5 + 0.5
        });
      }
    };

    // -------------------------------------------------------------
    // Gentle Luminous Light Beads (Slow, Soft Ambient Energy)
    // -------------------------------------------------------------
    const pulses = [
      { t: 0.1, speed: 0.0018, strand: 0 },
      { t: 0.6, speed: 0.0015, strand: 0 },
      { t: 0.3, speed: 0.0020, strand: 1 },
      { t: 0.8, speed: 0.0016, strand: 1 },
      { t: 0.4, speed: 0.0019, strand: 2 }
    ];

    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      initNodes();
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // -------------------------------------------------------------
    // Strict Boundary & Scroll Monitoring
    // -------------------------------------------------------------
    let scrollY = window.scrollY || 0;

    const checkScroll = () => {
      scrollY = window.scrollY || window.pageYOffset || 0;
      const projectsEl = document.getElementById('projects');
      
      if (projectsEl) {
        const rect = projectsEl.getBoundingClientRect();
        
        // 1. If user is in the opening Hero section, STRICTLY DISABLE (targetOpacity = 0.0)
        if (rect.top >= window.innerHeight * 0.75) {
          targetOpacity = 0;
        } else {
          // 2. Smooth, gradual entry as "Engineered Works." comes into view
          const entryProgress = Math.min(1, Math.max(0, (window.innerHeight * 0.75 - rect.top) / (window.innerHeight * 0.45)));
          
          // 3. Gentle natural fade near the bottom of the footer
          let exitProgress = 1;
          const footerEl = document.querySelector('footer');
          if (footerEl) {
            const fRect = footerEl.getBoundingClientRect();
            if (fRect.bottom <= window.innerHeight + 100) {
              exitProgress = Math.max(0.2, (fRect.bottom - window.innerHeight * 0.25) / (window.innerHeight * 0.75));
            }
          }

          targetOpacity = entryProgress * exitProgress;
        }
      } else {
        targetOpacity = scrollY > 200 ? 1 : 0;
      }
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();

    let time = 0;

    // -------------------------------------------------------------
    // Main Render Loop
    // -------------------------------------------------------------
    const render = () => {
      // Slow, meditative fluid time step
      time += prefersReducedMotion ? 0 : 0.006;

      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      currentOpacity += (targetOpacity - currentOpacity) * 0.07;

      ctx.clearRect(0, 0, width, height);

      // Only draw when active and past the hero boundary
      if (currentOpacity > 0.005) {
        ctx.save();
        ctx.globalAlpha = currentOpacity;

        // Gentle, calm parallax coordinate linked to vertical scroll
        const scrollParallax = scrollY * 0.18;

        // -------------------------------------------------------------
        // LAYER 1 (Depth): Soft Volumetric Titanium Caustics
        // -------------------------------------------------------------
        const glow1X = width * 0.25 + Math.sin(time * 0.25) * (width * 0.12);
        const glow1Y = height * 0.35 + Math.cos(time * 0.2) * (height * 0.12);
        const grad1 = ctx.createRadialGradient(glow1X, glow1Y, 20, glow1X, glow1Y, width * 0.5);
        grad1.addColorStop(0, 'rgba(230, 238, 250, 0.022)');
        grad1.addColorStop(0.5, 'rgba(190, 205, 220, 0.008)');
        grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad1;
        ctx.fillRect(0, 0, width, height);

        const glow2X = width * 0.75 + Math.cos(time * 0.22) * (width * 0.14);
        const glow2Y = height * 0.65 + Math.sin(time * 0.24) * (height * 0.12);
        const grad2 = ctx.createRadialGradient(glow2X, glow2Y, 25, glow2X, glow2Y, width * 0.5);
        grad2.addColorStop(0, 'rgba(240, 245, 255, 0.018)');
        grad2.addColorStop(0.5, 'rgba(180, 195, 215, 0.006)');
        grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad2;
        ctx.fillRect(0, 0, width, height);

        // -------------------------------------------------------------
        // LAYER 2 (Midground): Restrained, Eye-Comfortable Web Constellation
        // -------------------------------------------------------------
        const maxConnectDist = width < 640 ? 110 : 145;

        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];

          if (!prefersReducedMotion) {
            node.x += node.vx * node.depth;
            node.y += node.vy * node.depth;

            if (node.x < -20) node.x = width + 20;
            if (node.x > width + 20) node.x = -20;
            if (node.y < -20) node.y = height + 20;
            if (node.y > height + 20) node.y = -20;

            // Gentle, soft mouse tension deflection (no harsh repulsions)
            if (mouse.active) {
              const dx = mouse.x - node.x;
              const dy = mouse.y - node.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 180 && dist > 0) {
                const force = (1 - dist / 180) * 0.8;
                node.x -= (dx / dist) * force * 1.8;
                node.y -= (dy / dist) * force * 1.8;
              }
            }
          }

          const pulse = Math.sin(time * 2 + node.phase) * 0.25 + 1;
          const nodeRadius = node.radius * pulse * node.depth;

          // Soft node core (restrained alpha)
          ctx.beginPath();
          ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(235, 242, 255, ${0.35 * node.depth})`;
          ctx.fill();

          // Connective Web Strands (very light, elegant hairline connections)
          for (let j = i + 1; j < nodes.length; j++) {
            const other = nodes[j];
            const dx = other.x - node.x;
            const dy = other.y - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxConnectDist) {
              const bondStrength = 1 - dist / maxConnectDist;
              const bondAlpha = bondStrength * 0.16 * Math.min(node.depth, other.depth);
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = `rgba(220, 232, 248, ${bondAlpha})`;
              ctx.lineWidth = 0.85;
              ctx.stroke();
            }
          }
        }

        // -------------------------------------------------------------
        // LAYER 3 (Foreground): 3 Graceful Tensile Filaments (Subtle Silver)
        // -------------------------------------------------------------
        const strandsConfig = [
          { baseY: 0.24, amp: 45, freq: 0.0018, phase: 0, coreAlpha: 0.26, glowAlpha: 0.08, width: 1.2 },
          { baseY: 0.56, amp: 55, freq: 0.0014, phase: 2.4, coreAlpha: 0.22, glowAlpha: 0.06, width: 1.1 },
          { baseY: 0.84, amp: 50, freq: 0.0017, phase: 4.8, coreAlpha: 0.20, glowAlpha: 0.05, width: 1.0 }
        ];

        const strandPoints = [[], [], []];

        strandsConfig.forEach((cfg, sIdx) => {
          const step = width < 640 ? 30 : 18;
          const baseY = height * cfg.baseY + (Math.sin(time * 0.35 + cfg.phase) * 35) - (scrollParallax % (height * 1.5)) + (height * 0.25);
          
          const points = [];
          for (let x = -20; x <= width + step + 20; x += step) {
            const w1 = Math.sin((x * cfg.freq) + time * 0.8 + cfg.phase) * cfg.amp;
            const w2 = Math.cos((x * cfg.freq * 0.5) - time * 0.6 + cfg.phase * 1.2) * (cfg.amp * 0.4);
            const w3 = Math.sin((x * 0.0005) + (scrollY * 0.0008)) * 20;
            points.push({ x, y: baseY + w1 + w2 + w3 });
          }
          strandPoints[sIdx] = points;

          // A. Soft, Restrained Luminous Halo
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);
          for (let p = 1; p < points.length; p++) {
            ctx.lineTo(points[p].x, points[p].y);
          }
          const haloGrad = ctx.createLinearGradient(0, 0, width, 0);
          haloGrad.addColorStop(0, 'rgba(215, 230, 255, 0)');
          haloGrad.addColorStop(0.2, `rgba(230, 240, 255, ${cfg.glowAlpha})`);
          haloGrad.addColorStop(0.5, `rgba(255, 255, 255, ${cfg.glowAlpha * 1.3})`);
          haloGrad.addColorStop(0.8, `rgba(230, 240, 255, ${cfg.glowAlpha})`);
          haloGrad.addColorStop(1, 'rgba(215, 230, 255, 0)');
          ctx.strokeStyle = haloGrad;
          ctx.lineWidth = cfg.width * 2.8;
          ctx.stroke();

          // B. Fine Core Hairline
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);
          for (let p = 1; p < points.length; p++) {
            ctx.lineTo(points[p].x, points[p].y);
          }
          const coreGrad = ctx.createLinearGradient(0, 0, width, 0);
          coreGrad.addColorStop(0, 'rgba(205, 220, 240, 0)');
          coreGrad.addColorStop(0.25, `rgba(230, 240, 255, ${cfg.coreAlpha})`);
          coreGrad.addColorStop(0.5, `rgba(255, 255, 255, ${cfg.coreAlpha * 1.2})`);
          coreGrad.addColorStop(0.75, `rgba(230, 240, 255, ${cfg.coreAlpha})`);
          coreGrad.addColorStop(1, 'rgba(205, 220, 240, 0)');
          ctx.strokeStyle = coreGrad;
          ctx.lineWidth = cfg.width;
          ctx.stroke();
        });

        // -------------------------------------------------------------
        // Gentle, Calm Traveling Ambient Light Beads (No Flashing)
        // -------------------------------------------------------------
        if (!prefersReducedMotion) {
          pulses.forEach((pulse) => {
            pulse.t += pulse.speed;
            if (pulse.t > 1) pulse.t = 0;

            const points = strandPoints[pulse.strand];
            if (!points || points.length < 2) return;

            const totalIdx = (points.length - 1) * pulse.t;
            const idx = Math.floor(totalIdx);
            const frac = totalIdx - idx;
            const p1 = points[idx];
            const p2 = points[Math.min(idx + 1, points.length - 1)];

            if (!p1 || !p2) return;

            const px = p1.x + (p2.x - p1.x) * frac;
            const py = p1.y + (p2.y - p1.y) * frac;

            // Soft radial bead glow (restrained, calm)
            const pulseGrad = ctx.createRadialGradient(px, py, 1, px, py, 22);
            pulseGrad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
            pulseGrad.addColorStop(0.4, 'rgba(230, 240, 255, 0.14)');
            pulseGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.beginPath();
            ctx.arc(px, py, 22, 0, Math.PI * 2);
            ctx.fillStyle = pulseGrad;
            ctx.fill();

            // Tiny specular spark
            ctx.beginPath();
            ctx.arc(px, py, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
            ctx.fill();
          });
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ zIndex: 1 }}
      className="fixed inset-0 pointer-events-none transition-opacity duration-700 ease-out"
      aria-hidden="true"
    />
  );
}
