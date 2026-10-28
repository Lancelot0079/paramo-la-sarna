import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

// Media query reactiva: se actualiza al girar el teléfono o cambiar el tamaño de la ventana
export function useMedia(query) {
  return useSyncExternalStore(
    cb => {
      const m = matchMedia(query);
      m.addEventListener('change', cb);
      return () => m.removeEventListener('change', cb);
    },
    () => matchMedia(query).matches,
    () => false,
  );
}

// Perfil del dispositivo, usado por los componentes que cambian de forma y no solo de tamaño
export function useScreen() {
  const phone = useMedia('(max-width: 640px)');
  const compact = useMedia('(max-width: 900px)');
  const wide = useMedia('(min-width: 1600px)');
  const short = useMedia('(max-height: 560px) and (orientation: landscape)');
  const touch = useMedia('(pointer: coarse)');
  const reduce = useMedia('(prefers-reduced-motion: reduce)');
  return { phone, compact, wide, short, touch, reduce, split: !compact && !short };
}

// Devuelve [ref, visto]: true la primera vez que el elemento entra en pantalla
export function useInView(options = { rootMargin: '0px 0px -10% 0px' }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, options);
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return [ref, seen];
}

// Índice del capítulo que ocupa el centro de la pantalla
export function useActiveChapter(ids) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const els = ids.map(id => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) setActive(ids.indexOf(e.target.id));
    }), { rootMargin: '-40% 0px -55% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [ids.join()]);
  return [active, setActive];
}
