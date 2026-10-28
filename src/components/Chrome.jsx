import { useEffect, useRef, useState } from 'react';
import { CHAPTERS, IMAGES, SOURCES } from '../data';

export function Nav({ active }) {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = scrollY;
      setHidden(y > lastY.current && y > 200);
      lastY.current = y;
    };
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { if (hidden) setOpen(false); }, [hidden]);

  const current = CHAPTERS[active]?.id;
  return (
    <header className={`nav${hidden ? ' hide' : ''}${open ? ' open' : ''}`}>
      <a className="mark" href="#inicio">La Sarna, 2001</a>
      <button
        type="button"
        className="menu-btn"
        aria-expanded={open}
        aria-controls="nav-links"
        onClick={() => setOpen(o => !o)}
      >
        {open ? 'Cerrar' : 'Capítulos'}
      </button>
      <nav id="nav-links" className="links" aria-label="Capítulos">
        {CHAPTERS.filter(c => c.nav).map(c => (
          <a
            key={c.id}
            className="l"
            href={`#${c.id}`}
            aria-current={current === c.id ? 'true' : undefined}
            onClick={() => setOpen(false)}
          >
            {c.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

// Indicador de capítulo y navegación con flechas, solo donde hay teclado y espacio
export function Progress({ active, go }) {
  return (
    <div className="progress" aria-label="Navegación por capítulos">
      <button type="button" onClick={() => go(-1)} aria-label="Capítulo anterior">←</button>
      <span className="lbl">{CHAPTERS[active]?.label}</span>
      <span className="bar"><i style={{ transform: `scaleX(${(active + 1) / CHAPTERS.length})` }} /></span>
      <button type="button" onClick={() => go(1)} aria-label="Capítulo siguiente">→</button>
    </div>
  );
}

const CREDITS = [
  ['Camino entre la niebla', 'https://commons.wikimedia.org/wiki/File:WLE2026_CO_-_Camino_entre_la_niebla_del_PNN_Chingaza_(47).jpg'],
  ['Capilla en la niebla', 'https://commons.wikimedia.org/wiki/File:WLE2026_CO_-_Capilla_en_la_niebla,_PNN_Chingaza_(48).jpg', ', Jedidiahhorne, CC BY-SA 4.0; '],
  ['Páramo del Consuelo 1', 'https://commons.wikimedia.org/wiki/File:P%C3%A1ramo_del_Consuelo_1,_Boyac%C3%A1,_Colombia.jpg', ', '],
  ['11', 'https://commons.wikimedia.org/wiki/File:P%C3%A1ramo_del_Consuelo_11,_Boyac%C3%A1,_Colombia.jpg', ' y '],
  ['12', 'https://commons.wikimedia.org/wiki/File:P%C3%A1ramo_del_Consuelo_12,_Boyac%C3%A1,_Colombia.jpg', ', VeRdUgO PY, CC BY-SA 4.0; '],
  ['La niebla en el Páramo', 'https://commons.wikimedia.org/wiki/File:La_niebla_en_el_P%C3%A1ramo.jpg', ', JuanitoCISF, CC BY-SA 4.0; '],
  ['Lago de Tota', 'https://commons.wikimedia.org/wiki/File:Lago_de_Tota,_Boyac%C3%A1,_Colombia.png', ', Eber Roncancio, CC BY 4.0; '],
  ['Frailejón', 'https://commons.wikimedia.org/wiki/File:Frailej%C3%B3n_(Espeletia).jpg', ', Kithpro, CC0; '],
  ['Aquitania', 'https://commons.wikimedia.org/wiki/File:Aquitania_boyaca.jpg', ', Frank Ballesteros, dominio público.'],
];

export function Footer() {
  return (
    <footer className="end">
      <div className="ph">
        <img src={IMAGES.road} alt="Camino de tierra que desaparece en la niebla del páramo" width="1920" height="1280" loading="lazy" />
      </div>
      <div className="menu">
        <span className="mark">La Sarna, 2001</span>
        <nav aria-label="Capítulos">
          {CHAPTERS.filter(c => c.nav).map(c => <a key={c.id} href={`#${c.id}`}>{c.label}</a>)}
        </nav>
        <div className="sources">
          {SOURCES.map(([title, list]) => (
            <div key={title}>
              <b>{title}</b>
              <ul>{list.map(([t, u]) => <li key={u}><a href={u} target="_blank" rel="noreferrer">{t}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <p className="credits">
          Imágenes vía Wikimedia Commons:{' '}
          {CREDITS.map(([t, u, after], k) => (
            <span key={u}>
              {k === 1 && ' y '}
              <a href={u} target="_blank" rel="noreferrer">{t}</a>
              {after}
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}
