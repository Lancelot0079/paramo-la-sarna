import { useCallback, useEffect } from 'react';
import { CHAPTERS, REEL } from './data';
import { useActiveChapter, useScreen } from './hooks';
import { Footer, Nav, Progress } from './components/Chrome';
import { Day, Figures, Justice, Memory, Opening, Ruling, Think, Victims } from './components/Sections';

const IDS = CHAPTERS.map(c => c.id);

export default function App() {
  const screen = useScreen();
  const [active, setActive] = useActiveChapter(IDS);

  const go = useCallback(d => {
    const i = Math.max(0, Math.min(IDS.length - 1, active + d));
    document.getElementById(IDS[i])?.scrollIntoView({ behavior: screen.reduce ? 'auto' : 'smooth', block: 'start' });
    setActive(i);
  }, [active, screen.reduce]);

  // Presentación con teclado: flechas, AvPág/RePág
  useEffect(() => {
    const onKey = e => {
      if (e.target.matches('input, textarea, select')) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); go(1); }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go(-1); }
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [go]);

  return (
    <>
      <a className="skip" href="#contexto">Saltar al contenido</a>
      <Nav active={active} />
      <main>
        <Opening screen={screen} />
        <Day screen={screen} />
        <Victims />
        <Figures />
        <Justice />
        <Ruling />
        <Memory screen={screen} reel={REEL} />
        <Think />
      </main>
      <Footer />
      {!screen.touch && !screen.compact && <Progress active={active} go={go} />}
    </>
  );
}
