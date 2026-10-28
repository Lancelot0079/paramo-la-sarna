import { createElement, useEffect, useRef, useState } from 'react';
import { useInView } from '../hooks';

// Entrada escalonada: sube y aparece una vez al entrar en pantalla
export function Reveal({ as = 'div', i = 0, className = '', style, children, ...rest }) {
  const [ref, seen] = useInView();
  return createElement(as, {
    ref,
    className: `rv${seen ? ' in' : ''}${className ? ' ' + className : ''}`,
    style: { '--i': i, ...style },
    ...rest,
  }, children);
}

// Escenario partido: una columna de lectura y una foto fija que cambia con cada sección
export function Split({ images, caption, note, reverse = false, children }) {
  const colRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = colRef.current?.querySelectorAll('[data-stage]') ?? [];
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) setActive(+e.target.dataset.stage);
    }), { rootMargin: '-45% 0px -45% 0px' });
    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div className={`split${reverse ? ' rev' : ''}`}>
      <div className="col" ref={colRef}>
        <div className="col-in">{children}</div>
      </div>
      <div className="stage" aria-hidden="true">
        {images.map((im, k) => (
          <img
            key={im.src}
            className={k === active ? 'on' : ''}
            src={im.src}
            width={im.w}
            height={im.h}
            alt=""
            loading={im.eager ? 'eager' : 'lazy'}
            style={im.pos ? { objectPosition: im.pos } : undefined}
          />
        ))}
        <div className="bar"><span>{caption}</span><span>{note}</span></div>
      </div>
    </div>
  );
}
