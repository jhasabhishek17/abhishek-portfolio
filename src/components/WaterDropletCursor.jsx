import React, { useEffect, useRef, useState } from 'react';

export default function WaterDropletCursor() {
  const dropletRef = useRef(null);
  const rippleRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Detect touch / mobile devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let mouseX = -100;
    let mouseY = -100;
    let dropX = -100;
    let dropY = -100;
    let velX = 0;
    let velY = 0;
    let isHovered = false;
    let isClicking = false;
    let rafId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      if (target) {
        isHovered = !!target.closest('a, button, [role="button"], input, textarea, select');
      }
    };

    const handleMouseDown = () => {
      isClicking = true;
      if (rippleRef.current) {
        rippleRef.current.style.transform = 'translate(-50%, -50%) scale(2.2)';
        rippleRef.current.style.opacity = '0';
        rippleRef.current.style.transition = 'transform 0.45s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.45s ease-out';
      }
    };

    const handleMouseUp = () => {
      isClicking = false;
      setTimeout(() => {
        if (rippleRef.current) {
          rippleRef.current.style.transition = 'none';
          rippleRef.current.style.transform = 'translate(-50%, -50%) scale(0.8)';
          rippleRef.current.style.opacity = '0.5';
        }
      }, 250);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const animateDroplet = () => {
      // Spring lerp physics
      const prevX = dropX;
      const prevY = dropY;

      dropX += (mouseX - dropX) * 0.22;
      dropY += (mouseY - dropY) * 0.22;

      velX = dropX - prevX;
      velY = dropY - prevY;

      const speed = Math.sqrt(velX * velX + velY * velY);
      const angle = Math.atan2(velY, velX);

      // Liquid elongation / deformation along velocity angle
      const stretch = Math.min(0.38, speed * 0.035);
      const scaleX = 1 + stretch;
      const scaleY = Math.max(0.68, 1 - stretch * 0.65);

      if (dropletRef.current) {
        const baseSize = isHovered ? 48 : isClicking ? 26 : 34;
        
        dropletRef.current.style.transform = `translate3d(${dropX}px, ${dropY}px, 0) translate(-50%, -50%) rotate(${angle}rad) scale(${scaleX}, ${scaleY})`;
        dropletRef.current.style.width = `${baseSize}px`;
        dropletRef.current.style.height = `${baseSize}px`;
      }

      rafId = requestAnimationFrame(animateDroplet);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    rafId = requestAnimationFrame(animateDroplet);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Liquid Lens Droplet */}
      <div
        ref={dropletRef}
        className="absolute top-0 left-0 rounded-full transition-[width,height] duration-200 ease-out will-change-transform"
        style={{
          background: 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.22) 0%, rgba(30, 32, 42, 0.28) 45%, rgba(5, 5, 8, 0.55) 100%)',
          boxShadow: `
            inset 1.5px 1.5px 3px rgba(255, 255, 255, 0.55),
            inset -2px -2px 4px rgba(0, 0, 0, 0.8),
            0 4px 14px -2px rgba(0, 0, 0, 0.75),
            0 0 16px -2px rgba(255, 255, 255, 0.12)
          `,
          backdropFilter: 'blur(0.8px) contrast(1.18) brightness(1.1)',
          WebkitBackdropFilter: 'blur(0.8px) contrast(1.18) brightness(1.1)',
          border: '0.5px solid rgba(255, 255, 255, 0.35)',
        }}
      >
        {/* Specular White Surface Glint (Top-Left Dome Highlight) */}
        <div 
          className="absolute top-1.5 left-2 w-2 h-1.5 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.3) 70%, transparent 100%)',
            transform: 'rotate(-30deg)'
          }}
        />

        {/* Secondary Delicate Caustic Glint (Bottom-Right Rim) */}
        <div 
          className="absolute bottom-1 right-2 w-1.5 h-1 rounded-full pointer-events-none opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 100%)'
          }}
        />

        {/* Click Water Ripple Ring */}
        <div
          ref={rippleRef}
          className="absolute top-1/2 left-1/2 w-full h-full rounded-full border border-white/40 pointer-events-none opacity-0"
          style={{ transform: 'translate(-50%, -50%) scale(0.8)' }}
        />
      </div>
    </div>
  );
}
