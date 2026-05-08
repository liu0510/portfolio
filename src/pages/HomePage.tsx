import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        const t = setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 60);
        return () => clearTimeout(t);
      }
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location.hash, location.key]);

  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Contact />
    </>
  );
}
