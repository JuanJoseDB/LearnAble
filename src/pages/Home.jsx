import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../context/RoleContext.jsx';
import { courses } from '../data/courses.js';
import StatsStrip from '../components/StatsStrip.jsx';
import FeatureRow from '../components/FeatureRow.jsx';

export default function Home() {
  const { setRole } = useRole();
  const navigate = useNavigate();

  return (
    <section className="container">
      {/* HERO */}
      <div className="hero">
        <div>
          <h1>Inclusive microlearning for every learner</h1>
          <p>
            Accessibility-first lessons with captions, transcripts, read aloud, keyboard navigation,
            high contrast, dyslexia & low-stimulus modes, and low-bandwidth delivery. Teachers get
            classroom activities and accommodation tips.
          </p>
          <div className="cta">
            <button className="btn primary" onClick={()=>{ setRole('learner'); navigate('/courses'); }}>
              I’m a learner
            </button>
            <button className="btn" onClick={()=>{ setRole('teacher'); navigate('/courses'); }}>
              I’m a teacher
            </button>
          </div>
        </div>
        <div className="hero-ill" aria-hidden="true">
          <svg viewBox="0 0 300 180" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#6aa8ff" stopOpacity="0.35"/>
                <stop offset="100%" stopColor="#7ef0d2" stopOpacity="0.35"/>
              </linearGradient>
            </defs>
            <circle cx="80" cy="90" r="60" fill="url(#g1)"/>
            <rect x="150" y="40" width="110" height="110" rx="16" fill="#7ef0d220" stroke="#7ef0d233"/>
            <path d="M20 150 L120 150 L70 110 Z" fill="#6aa8ff22" stroke="#6aa8ff33"/>
          </svg>
        </div>
      </div>

      {/* STRIP DE STATS / BENEFICIOS */}
      <StatsStrip />

      {/* FEATURE ROWS (alternadas) */}
      <FeatureRow
        title="Equivalent content by design"
        text="Same learning goal through Video, Easy Text and Audio. Choose how to learn — inclusion is the default."
        bullets={[
          'Captions + transcripts in every lesson',
          'Read Aloud built-in',
          'Badges show accessibility features clearly'
        ]}

      />

      {/* PREVIEW DE CURSOS (dinámico) */}
      <section style={{marginTop:24}}>
        <h2>Sample courses</h2>
        <div className="grid" role="list" style={{marginTop:8}}>
          {courses.map(c => (
            <article key={c.id} className="card" role="listitem">
              <h3 style={{marginBottom:6}}>{c.title}</h3>
              <p style={{marginTop:0}}>{c.short}</p>
              <ul className="badges" aria-label="Features">
                {c.badges?.slice(0,4).map((b,i)=><li key={i}>✓ {b}</li>)}
              </ul>
              <button className="btn" onClick={()=>navigate(`/course/${c.id}`)}>Open course</button>
            </article>
          ))}
        </div>
      </section>

      {/* ESCENARIO / CASO PRÁCTICO (timeline simple) */}
      <section style={{marginTop:24}}>
        <div className="card">
          <h3>Scenario: mixed-ability classroom</h3>
          <ol className="timeline">
            <li><strong>Teacher</strong> sets class goal and opens activities.</li>
            <li><strong>Students</strong> choose mode: Video · Easy Text · Audio.</li>
            <li><strong>Profiles</strong> apply: Dyslexia spacing, Low Vision contrast, Low-stimulus visuals.</li>
            <li><strong>Assessment</strong> is flexible: record audio, draw, or write.</li>
          </ol>
        </div>
      </section>

      {/* COMPARATIVA breve */}
      <section style={{marginTop:24}}>
        <div className="compare">
          <div className="card">
            <h3>Typical platform</h3>
            <ul className="feature-list">
              <li>Video only</li>
              <li>Captions optional</li>
              <li>No profiles</li>
              <li>Heavy pages</li>
            </ul>
          </div>
          <div className="card highlight">
            <h3>LearnAble</h3>
            <ul className="feature-list">
              <li><strong>Video · Easy Text · Audio</strong></li>
              <li><strong>Captions + transcripts</strong></li>
              <li><strong>Assistive profiles</strong></li>
              <li><strong>Low-bandwidth mode</strong></li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ en acordeones */}
      <section style={{marginTop:24}}>
        <div className="card">
          <h3>FAQ</h3>
          <details className="faq"><summary>Does it work offline?</summary><p>We prioritize transcripts and can cache content as a PWA in the next milestone.</p></details>
          <details className="faq"><summary>How are profiles different?</summary><p>They apply multiple settings at once (contrast, spacing, targets, motion) tuned to common needs.</p></details>
          <details className="faq"><summary>Is data collected?</summary><p>Only anonymous usage counts (local). No personal data in the prototype.</p></details>
        </div>
      </section>

    </section>
  );
}
