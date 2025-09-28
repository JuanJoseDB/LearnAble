import React from 'react';
import { useRole } from '../context/RoleContext.jsx';

export default function Impact(){
  const { analytics } = useRole();
  const entries = Object.entries(analytics || {});
  return (
    <section className="container">
      <h2>Inclusion Impact (demo)</h2>
      {entries.length === 0 ? <p>No data yet. Interact with toggles and tabs.</p> : (
        <ul>
          {entries.map(([k,v]) => <li key={k}><strong>{k}</strong>: {v}</li>)}
        </ul>
      )}
      <p style={{color:'var(--muted)'}}>Privacy note: counts are stored locally (no personal data).</p>
    </section>
  );
}
