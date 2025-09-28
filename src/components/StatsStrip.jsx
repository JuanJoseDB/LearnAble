import React from 'react';

export default function StatsStrip(){
  const items = [
    { kpi: '3', label: 'learning modes', sub: 'Video · Easy Text · Audio' },
    { kpi: '5', label: 'assistive profiles', sub: 'Dyslexia · Low Vision · Autism · Deaf/HoH · Motor' },
    { kpi: 'Low-BW', label: 'ready', sub: 'Transcripts-first' },
  ];
  return (
    <section className="stats-strip">
      {items.map((it, i)=>(
        <div className="stat" key={i}>
          <div className="kpi">{it.kpi}</div>
          <div className="label">{it.label}</div>
          <div className="sub">{it.sub}</div>
        </div>
      ))}
    </section>
  );
}
