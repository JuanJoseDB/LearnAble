import React, { useEffect, useRef, useState } from 'react';

export default function ReadAloud({ text }) {
  const [speaking, setSpeaking] = useState(false);
  const utterRef = useRef(null);

  useEffect(() => {
    return () => { window.speechSynthesis.cancel(); };
  }, []);

  const speak = () => {
    if (!text) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.onend = () => setSpeaking(false);
    utterRef.current = u;
    setSpeaking(true);
    window.speechSynthesis.speak(u);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <div className="actions" role="group" aria-label="Read aloud controls">
      {!speaking ? (
        <button className="btn" onClick={speak} aria-label="Read transcript aloud">Read Aloud</button>
      ) : (
        <button className="btn" onClick={stop} aria-label="Stop reading">Stop</button>
      )}
      <a className="btn" href={`data:text/plain;charset=utf-8,${encodeURIComponent(text)}`} download="transcript.txt">
        Download transcript
      </a>
    </div>
  );
}
