import React, { createContext, useContext, useEffect, useState } from 'react';

const RoleContext = createContext();

export function RoleProvider({ children }) {
  // roles
  const [role, setRole] = useState(() => localStorage.getItem('role') || null);

  // accesibilidad
  const [fontScale, setFontScale] = useState(() => Number(localStorage.getItem('fontScale') || 1));
  const [highContrast, setHighContrast] = useState(() => localStorage.getItem('highContrast') === 'true');
  const [dyslexia, setDyslexia] = useState(() => localStorage.getItem('dyslexia') === 'true');
  const [lowStimulus, setLowStimulus] = useState(() => localStorage.getItem('lowStimulus') === 'true');
  const [lowBandwidth, setLowBandwidth] = useState(() => localStorage.getItem('lowBandwidth') === 'true');

  // analytics muy simple
  const [analytics, setAnalytics] = useState(() => {
    try { return JSON.parse(localStorage.getItem('analytics') || '{}'); } catch { return {}; }
  });
  function track(event) {
    setAnalytics(prev => {
      const next = { ...prev, [event]: (prev[event] || 0) + 1 };
      localStorage.setItem('analytics', JSON.stringify(next));
      return next;
    });
  }

  // efectos
  useEffect(() => { localStorage.setItem('role', role ?? ''); }, [role]);
  useEffect(() => {
    localStorage.setItem('fontScale', String(fontScale));
    document.documentElement.style.setProperty('--base-font', `${18 * fontScale}px`);
  }, [fontScale]);
  useEffect(() => { localStorage.setItem('highContrast', String(highContrast)); document.body.classList.toggle('high-contrast', highContrast); }, [highContrast]);
  useEffect(() => { localStorage.setItem('dyslexia', String(dyslexia)); document.body.classList.toggle('dyslexia-mode', dyslexia); }, [dyslexia]);
  useEffect(() => { localStorage.setItem('lowStimulus', String(lowStimulus)); document.body.classList.toggle('low-stimulus', lowStimulus); }, [lowStimulus]);
  useEffect(() => { localStorage.setItem('lowBandwidth', String(lowBandwidth)); }, [lowBandwidth]);

  // perfiles con 1 clic
  function applyProfile(profile) {
    if (!profile) return;
    if (profile === 'dyslexia') {
      setDyslexia(true); setHighContrast(false); setLowStimulus(false); setFontScale(1.2);
      track('profile_dyslexia');
    }
    if (profile === 'lowvision') {
      setHighContrast(true); setFontScale(1.4); setDyslexia(false); setLowStimulus(false);
      track('profile_lowvision');
    }
    if (profile === 'autism') {
      setLowStimulus(true); setHighContrast(false); setDyslexia(false); setFontScale(1.1);
      track('profile_autism');
    }
    if (profile === 'deaf') {
      // énfasis en transcript/cc (se usa en CourseDetail)
      setLowBandwidth(false); setHighContrast(false); setDyslexia(false); setFontScale(1.1);
      track('profile_deaf');
    }
    if (profile === 'motor') {
      setFontScale(1.3); setHighContrast(true); track('profile_motor');
    }
  }

  const value = {
    role, setRole,
    fontScale, setFontScale,
    highContrast, setHighContrast,
    dyslexia, setDyslexia,
    lowStimulus, setLowStimulus,
    lowBandwidth, setLowBandwidth,
    analytics, track,
    applyProfile
  };
  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}
export function useRole(){ return useContext(RoleContext); }
