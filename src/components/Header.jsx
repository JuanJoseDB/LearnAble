import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ onLogoClick }) {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const touchStartX = useRef(null);

  // Cierra al cambiar de ruta
  useEffect(() => { setOpen(false); }, [loc.pathname, loc.hash]);

  // Bloquea scroll del body + Esc + resize
  useEffect(() => {
    function onKey(e){ if (e.key === 'Escape') setOpen(false); }
    function onResize(){ if (window.innerWidth >= 1024) setOpen(false); }
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);

    // lock scroll
    const prev = document.body.style.overflow;
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = prev || '';

    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      document.body.style.overflow = prev || '';
    };
  }, [open]);

  // Swipe-to-close (deslizar de derecha a izquierda dentro del drawer/backdrop)
  function handleTouchStart(e){
    touchStartX.current = e.touches?.[0]?.clientX ?? null;
  }
  function handleTouchMove(e){
    if (touchStartX.current == null) return;
    const dx = (e.touches?.[0]?.clientX ?? 0) - touchStartX.current;
    // si arrastras > 40px hacia la derecha (dx > 40) cierra
    if (dx > 40) { setOpen(false); touchStartX.current = null; }
  }

  return (
    <header role="banner">
      <nav className="navbar" aria-label="Primary">
        {/* Marca fija esquina izquierda */}
        <div className="brand brand-fixed">
          <div className="logo" aria-hidden="true"></div>
          <button className="brand-link" onClick={() => { onLogoClick(); setOpen(false); }} aria-label="Go to home">
            LearnAble
          </button>
        </div>

        <div className="spacer" />

        {/* Botón hamburguesa esquina derecha */}
        <button
          className="btn hambtn"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          <span aria-hidden>☰</span>
        </button>

        {/* Backdrop (click o swipe cierra) */}
        {open && (
          <div
            className="backdrop"
            onClick={() => setOpen(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            aria-hidden="true"
          />
        )}

        {/* Drawer */}
        <aside
          className={`drawer ${open ? 'open' : ''}`}
          role="menu"
          aria-label="Main menu"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <button className="drawer-close" aria-label="Close menu" onClick={() => setOpen(false)}>×</button>
          <ul className="drawer-list">
            <li><Link to="/courses" onClick={()=>setOpen(false)}>Courses</Link></li>
            <li><Link to="/accessibility" onClick={()=>setOpen(false)}>Accessibility</Link></li>
            <li><Link to="/impact" onClick={()=>setOpen(false)}>Impact</Link></li>
            <li><Link to="/checker" onClick={()=>setOpen(false)}>Checker</Link></li>
          </ul>
        </aside>
      </nav>
    </header>
  );
}
