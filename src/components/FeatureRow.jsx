import React from 'react';

export default function FeatureRow({ title, text, bullets = [], reverse = false, icon='circle' }){
  return (
    <section className={`feature-row ${reverse ? 'reverse' : ''}`}>
      <div className="feature-art" aria-hidden="true">
        <svg viewBox="0 0 320 220" width="100%" height="100%">
          {icon==='circle' && <circle cx="90" cy="110" r="70" fill="#6aa8ff33" stroke="#6aa8ff55" />}
          {icon==='square' && <rect x="40" y="50" width="140" height="140" rx="18" fill="#7ef0d233" stroke="#7ef0d255" />}
          {icon==='triangle' && <path d="M40 180 L160 180 L100 70 Z" fill="#9fd8ff33" stroke="#9fd8ff55" />}
          <rect x="190" y="40" width="90" height="20" rx="6" fill="#ffffff22"/>
          <rect x="190" y="70" width="60" height="20" rx="6" fill="#ffffff22"/>
          <rect x="190" y="100" width="80" height="20" rx="6" fill="#ffffff22"/>
        </svg>
      </div>
      <div className="feature-copy card">
        <h3>{title}</h3>
        <p>{text}</p>
        {bullets.length>0 && (
          <ul className="feature-list">
            {bullets.map((b,i)=><li key={i}>{b}</li>)}
          </ul>
        )}
      </div>
    </section>
  );
}
