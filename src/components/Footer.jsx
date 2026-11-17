import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const [delhiTime, setDelhiTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setDelhiTime(now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="py-12 border-t border-monochrome-subtle bg-obsidian/35 backdrop-blur-[1px] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Identity & Copyright */}
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-graphite border border-monochrome-subtle flex items-center justify-center font-display font-bold text-[10px] text-silver-300">
              AJ
            </span>
            <span className="text-xs font-mono text-silver-500">
              © {new Date().getFullYear()} Abhishek Jha. All rights reserved.
            </span>
          </div>

          {/* Time Base */}
          <div className="flex items-center gap-2 text-xs font-mono text-silver-600">
            <span className="w-1.5 h-1.5 rounded-full bg-silver-400 animate-pulse" />
            <span>Delhi Base:</span>
            <span className="text-silver-300 font-medium">{delhiTime || '17:28:00 PM IST'}</span>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-monochrome-subtle bg-graphite hover:border-monochrome-hover text-xs font-mono text-silver-500 hover:text-white transition-all"
            aria-label="Return to Top of Page"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-silver-400" />
          </button>

        </div>
      </div>
    </footer>
  );
}
