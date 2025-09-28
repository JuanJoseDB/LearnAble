import React from 'react';
export default function Accessibility(){
  return (
    <section className="container">
      <h2>Accessibility Statement</h2>
      <ul>
        <li>Keyboard navigation with visible focus.</li>
        <li>High Contrast, Dyslexia mode, Low-stimulus, adjustable font size.</li>
        <li>Low-bandwidth mode (transcripts first, lighter media).</li>
        <li>Captions (VTT) and transcripts for every video + Read Aloud.</li>
        <li>Semantic structure and ARIA labels, descriptive links and image alt.</li>
        <li>We aim for WCAG 2.1 AA.</li>
      </ul>
    </section>
  );
}
