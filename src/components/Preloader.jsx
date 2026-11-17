import React, { useEffect, useState } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 850; // Under 1s fast cinematic intro

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const current = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 400);
        }, 100);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 150);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-12 transition-all duration-500 ease-out bg-void ${
        isExiting ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100 pointer-events-auto'
      }`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs font-mono tracking-widest-mono text-silver-600 uppercase">
        <span>KINETIC MATTER // INITIALIZATION</span>
        <button 
          onClick={handleSkip}
          className="hover:text-silver-300 transition-colors uppercase text-[11px]"
        >
          [ Skip ]
        </button>
      </div>

      {/* Center Reveal */}
      <div className="flex flex-col items-center justify-center my-auto">
        <div className="overflow-hidden mb-3">
          <span className="block text-4xl sm:text-6xl font-display font-bold tracking-tightest text-silver-100">
            ABHISHEK JHA
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-silver-500">
          <span className="w-1.5 h-1.5 rounded-full bg-silver-400 animate-ping" />
          <span>FULL STACK DEVELOPER</span>
        </div>
      </div>

      {/* Bottom Progress */}
      <div className="flex items-end justify-between border-t border-monochrome-subtle pt-6">
        <div className="w-32 sm:w-48 h-[2px] bg-graphite overflow-hidden rounded-full">
          <div 
            className="h-full bg-silver-300 transition-all duration-75 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xl sm:text-2xl font-mono text-silver-300 font-medium">
          {progress.toString().padStart(2, '0')}%
        </span>
      </div>
    </div>
  );
}
