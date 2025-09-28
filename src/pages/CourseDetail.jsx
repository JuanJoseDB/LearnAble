import React, { useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { courses } from '../data/courses.js';
import { useRole } from '../context/RoleContext.jsx';
import VideoPlayer from '../components/VideoPlayer.jsx';
import ReadAloud from '../components/ReadAloud.jsx';

const suggestions = {
  dyslexia: ['Break text into short lines','Use audio support','Allow extra time'],
  autism: ['Predictable routine','Low-stimulus visuals','Visual schedule'],
  lowvision: ['High contrast','XL font','Avoid light grey text'],
  deaf: ['Use captions and transcripts','Prefer visual instructions','Confirm understanding in writing'],
  motor: ['Large buttons (44px)','Clear focus order','Allow speech-to-text or partner scribe'],
};

export default function CourseDetail() {
  const { id } = useParams();
  const { role, lowBandwidth, track } = useRole();
  const course = useMemo(()=>courses.find(c => c.id === id), [id]);
  const [tab, setTab] = useState('video'); // 'video' | 'text' | 'audio' | 'activities'
  const [qr, setQr] = useState(null);
  const isTeacher = role === 'teacher';

  // QR opcional (no rompe si falta la lib)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const QR = await import('qrcode'); // carga dinámica
        const dataUrl = await QR.toDataURL(window.location.href, { width: 160 });
        if (mounted) setQr(dataUrl);
      } catch (e) {
        console.warn('QR disabled:', e?.message || e);
        if (mounted) setQr(null);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (!course) return <div className="container"><p>Course not found.</p></div>;

  const safe = (p) => p || '';

  return (
    <section className="container">
      <h2>{safe(course.title)}</h2>
      <p>{safe(course.short)}</p>
      {Array.isArray(course.badges) && (
        <ul className="badges" aria-label="Accessibility features">
          {course.badges.map((b,i)=><li key={i}>✓ {b}</li>)}
        </ul>
      )}

      <div className="tabs" role="tablist" aria-label="Course content">
        <button className="tab" role="tab" aria-selected={tab==='video'} onClick={()=>{ setTab('video'); track?.('tab_video'); }}>Video</button>
        <button className="tab" role="tab" aria-selected={tab==='text'} onClick={()=>{ setTab('text'); track?.('tab_text'); }}>Easy Text</button>
        <button className="tab" role="tab" aria-selected={tab==='audio'} onClick={()=>{ setTab('audio'); track?.('tab_audio'); }}>Audio</button>
        {isTeacher && <button className="tab" role="tab" aria-selected={tab==='activities'} onClick={()=>setTab('activities')}>Activities</button>}
      </div>

      {tab==='video' && (
        <article className="card">
          <h3>Lesson video</h3>
          {lowBandwidth ? (
            <>
              <p><strong>Low-bandwidth is ON.</strong> Showing transcript first.</p>
              <details open className="card">
                <summary><strong>Transcript</strong></summary>
                <p>{safe(course.transcript)}</p>
                <ReadAloud text={safe(course.transcript)} />
              </details>
              <VideoPlayer
                src={course.videoLow || course.video || ''}
                captionsSrc={course.captions || ''}
                title={safe(course.title)}
              />
            </>
          ) : (
            <>
              <VideoPlayer
                src={course.video || ''}
                captionsSrc={course.captions || ''}
                title={safe(course.title)}
              />
              <h4>Transcript</h4>
              <p>{safe(course.transcript)}</p>
              <ReadAloud text={safe(course.transcript)} />
            </>
          )}
        </article>
      )}

      {tab==='text' && (
        <article className="card">
          <h3>Easy Read</h3>
          <p>{safe(course.easyText)}</p>
        </article>
      )}

      {tab==='audio' && (
        <article className="card">
          <h3>Audio only</h3>
          <audio controls style={{ width:'100%' }}>
            <source src={course.audio || ''} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <p style={{ color:'var(--muted)' }}>Tip: combine audio with Easy Read.</p>
        </article>
      )}

      {tab==='activities' && isTeacher && (
        <article className="card">
          <h3>Classroom Activities</h3>
          <div style={{marginTop:12}}>
            {Object.entries(suggestions).map(([k,arr])=>(
              <details key={k} className="card" style={{marginTop:8}}>
                <summary><strong>{k}</strong></summary>
                <ul>{arr.map((s,i)=><li key={i}>{s}</li>)}</ul>
              </details>
            ))}
          </div>
          <hr />
          {Array.isArray(course.activities) && course.activities.map((a, idx) => (
            <details key={idx} className="card" style={{marginTop:12}}>
              <summary><strong>{a.title}</strong></summary>
              <ol>{a.steps.map((s,i)=><li key={i}>{s}</li>)}</ol>
            </details>
          ))}
        </article>
      )}

      <div className="card" style={{marginTop:16}}>
        <h4>QR Pack</h4>
        <p>Scan to open this lesson on any device.</p>
        {qr ? <img src={qr} alt="QR to this course" width="160" height="160" /> : <p style={{color:'var(--muted)'}}>QR unavailable in this build.</p>}
        <p style={{fontSize:'0.9em', color:'var(--muted)'}}>Use browser print to create a one-page handout (Ctrl/Cmd+P).</p>
      </div>
    </section>
  );
}
