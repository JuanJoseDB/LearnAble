import React from 'react';

export default function VideoPlayer({ src, captionsSrc, title }) {
  // If you don't have local videos yet, replace <source> with a placeholder or leave as is.
  return (
    <figure>
      <video
        controls
        aria-label={title}
        style={{ width: '100%', borderRadius: 12, border: '1px solid #e5e7eb' }}
      >
        <source src={src} type="video/mp4" />
        {captionsSrc && <track src={captionsSrc} kind="captions" srcLang="en" label="English" default />}
        Your browser does not support the video tag.
      </video>
      <figcaption style={{ color: 'var(--muted)' }}>{title}</figcaption>
    </figure>
  );
}
