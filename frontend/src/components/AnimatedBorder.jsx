import React from 'react';

function AnimatedBorder({ children }) {
  return (
    <div className="w-full h-full rounded-2xl border border-transparent animate-border flex overflow-hidden
      [background:linear-gradient(45deg,#172033,--theme(--color-slate-800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),--theme(--color-slate-600/48%)_80%,--theme(--color-cyan-500)_86%,--theme(--color-cyan-300)_90%,--theme(--color-cyan-500)_94%,--theme(--color-slate-600/48%))_border-box]"
    >
      {children}
    </div>
  );
};

export default AnimatedBorder;
