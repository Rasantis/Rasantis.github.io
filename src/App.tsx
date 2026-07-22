import { useEffect } from 'react';
import { LanguageProvider } from './i18n';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Projects from './components/Projects';
import Demos from './components/Demos';
import Systems from './components/Systems';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    // Reveal animations are opt-in: content stays visible if JS/IO is unavailable.
    if ('IntersectionObserver' in window) {
      document.body.classList.add('js-anim');
    }
  }, []);

  return (
    <LanguageProvider>
      <Nav />
      <div className="wrap">
        <Hero />
        <Stats />
        <Projects />
        <Demos />
        <Systems />
        <Skills />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
