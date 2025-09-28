import React, { useState } from 'react';

function luminance(rgb){
  const [r,g,b] = rgb.match(/\d+/g).map(Number).map(v=>{
    v/=255; return v<=0.03928? v/12.92 : Math.pow((v+0.055)/1.055,2.4);
  });
  return 0.2126*r + 0.7152*g + 0.0722*b;
}
function contrastRatio(c1,c2){
  const L1 = luminance(c1), L2 = luminance(c2);
  const [hi, lo] = L1 > L2 ? [L1,L2] : [L2,L1];
  return (hi + 0.05) / (lo + 0.05);
}

export default function Checker(){
  const [report, setReport] = useState(null);

  function run(){
    const issues = [];

    // imgs sin alt
    document.querySelectorAll('img').forEach(img=>{
      if (!img.hasAttribute('alt')) issues.push({type:'img-alt', msg:'Image without alt', el: img.outerHTML.slice(0,60)+'...'});
    });

    // botones sin label y con solo ícono
    document.querySelectorAll('button').forEach(btn=>{
      const label = btn.getAttribute('aria-label') || btn.textContent.trim();
      if (!label) issues.push({type:'btn-label', msg:'Button without text or aria-label', el: btn.outerHTML.slice(0,60)+'...'});
    });

    // contraste (chequeo básico en encabezados y botones)
    document.querySelectorAll('h1,h2,h3,button,.btn').forEach(el=>{
      const cs = getComputedStyle(el);
      const ratio = contrastRatio(cs.color, cs.backgroundColor || 'rgb(255,255,255)');
      if (ratio < 4.5) issues.push({type:'contrast', msg:`Low contrast ~ ${ratio.toFixed(2)}:1`, el: el.tagName});
    });

    setReport(issues);
  }

  return (
    <section className="container">
      <h2>Accessibility Checker (demo)</h2>
      <button className="btn" onClick={run}>Run check</button>
      {!report ? <p>Press “Run check”.</p> :
        report.length===0 ? <p>✅ No issues found in demo checks.</p> :
        <ul>{report.map((i,idx)=><li key={idx}><strong>{i.type}</strong> — {i.msg} — <code>{i.el}</code></li>)}</ul>
      }
      <p style={{color:'var(--muted)'}}>This is a lightweight checker for the prototype.</p>
    </section>
  );
}
