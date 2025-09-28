import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { RoleProvider } from './context/RoleContext.jsx';

import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Courses from './pages/Courses.jsx';
import CourseDetail from './pages/CourseDetail.jsx';

// Si aún no creaste estas páginas, comenta estos 3 imports y sus <Route> abajo
import Accessibility from './pages/Accessibility.jsx';
import Impact from './pages/Impact.jsx';
import Checker from './pages/Checker.jsx';

import ErrorBoundary from './components/ErrorBoundary.jsx';

export default function App() {
  const navigate = useNavigate();

  // Mantener foco visible para teclado
  useEffect(() => {
    const onMouseDown = () => document.body.classList.add('using-mouse');
    const onKeyDown = (e) => { if (e.key === 'Tab') document.body.classList.remove('using-mouse'); };
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <RoleProvider>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header onLogoClick={() => navigate('/')} />
      <main id="main" tabIndex="-1">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            {/* comenta estas si aún no creas los archivos */}
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/checker" element={<Checker />} />
            {/* fallback */}
            <Route path="*" element={<div className="container"><h2>Not found</h2></div>} />
          </Routes>
        </ErrorBoundary>
      </main>
    </RoleProvider>
  );
}
