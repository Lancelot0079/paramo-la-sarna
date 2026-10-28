import { useEffect, useRef, useState } from 'react';
import { IMAGES, QUESTIONS, RITUALS, STATIONS, VICTIMS, YEARS } from '../data';
import { useInView } from '../hooks';
import { Reveal, Split } from './Layout';

export function Opening({ screen }) {
  return (
    <Split
      images={[
        { src: IMAGES.road, w: 1920, h: 1280, pos: '58% 50%', eager: true },
        { src: IMAGES.consuelo12, w: 1920, h: 1440 },
      ]}
      caption="Vía Sogamoso – Labranzagrande"
      note="Páramo de niebla, imagen de referencia"
    >
      <section className="hero" id="inicio" data-stage="0">
        <Reveal as="h1">Masacre&nbsp;de La&nbsp;Sarna</Reveal>
        <Reveal as="p" i={1} className="date">Sábado 1 de diciembre de 2001<br />Vereda Toquilla, Aquitania, Boyacá</Reveal>
        <Reveal as="p" i={2} className="lede">Hacia las siete de la mañana, paramilitares detuvieron un bus que iba de Sogamoso a Labranzagrande, hicieron tenderse boca abajo a los pasajeros y asesinaron a quince de los dieciocho ocupantes.</Reveal>
        <Reveal i={3} className="actions">
          <a className="btn" href="#contexto">Recorrer la cronología <span className="arr" aria-hidden="true">↓</span></a>
          {screen.touch
            ? <span className="hint">Deslice hacia abajo para avanzar</span>
            : <span className="hint">Use <kbd>←</kbd> <kbd>→</kbd> para avanzar como presentación</span>}
        </Reveal>
      </section>

      <section className="context" id="contexto" data-stage="1">
        <Reveal as="h2">Un corredor en disputa</Reveal>
        <Reveal as="p" i={1}>La vía que sube de Sogamoso, cruza el páramo de La Sarna y baja a Labranzagrande une el altiplano boyacense con el Casanare. A comienzos de los 2000 era un corredor que los grupos armados querían controlar.</Reveal>
        <Reveal as="p" i={2}>Desde el año 2000 las Autodefensas Campesinas del Casanare (ACC), conocidas como los «Buitragueños» y comandadas por Héctor Buitrago, alias «Martín Llanos», se expandieron hacia la cordillera y crearon frentes urbanos en Sogamoso. Sus hombres asesinaban a habitantes a quienes acusaban de colaborar con la guerrilla.</Reveal>
        <Reveal as="p" i={3}>La provincia de La Libertad, y Labranzagrande en particular, cargaba un estigma: el de ser «zona guerrillera». Según el Consejo de Estado, la propia fuerza pública ayudó a crear y alimentar ese señalamiento, y algunos militares consideraban a los «labranceros» objetivo militar.</Reveal>
        <Reveal as="p" i={4}>Quince días antes de la masacre circularon panfletos de las AUC que advertían de un hecho grave. Nadie actuó.</Reveal>
        <Reveal i={5} className="warn">
          <p>Aquitania ya conocía la violencia oficial: en 1991 y 1992 tropas del Batallón Tarqui ejecutaron a campesinos de la zona y los presentaron como guerrilleros muertos en combate.</p>
        </Reveal>
      </section>
    </Split>
  );
}

// La mañana del 1 de diciembre, de 5:00 a 15:00
const pos = h => ((h - 5) / 10) * 100;

export function Day({ screen }) {
  const [k, setK] = useState(0);
  const touchX = useRef(null);
  const st = STATIONS[k];
  const stepper = screen.compact;

  const swipeStart = e => { touchX.current = e.touches[0].clientX; };
  const swipeEnd = e => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) setK(v => Math.max(0, Math.min(STATIONS.length - 1, v + (dx < 0 ? 1 : -1))));
    touchX.current = null;
  };

  return (
    <section className="day" id="el-dia">
      <div className="day-head">
        <Reveal as="h2">Siete horas sin Estado</Reveal>
        <Reveal as="p" i={1}>
          Los hechos ocurrieron hacia las 7:00 a. m. Las autoridades llegaron a las 2:00 p. m.{' '}
          {stepper ? 'Deslice la tarjeta o mueva el control para recorrer la mañana.' : 'Mueva el control o toque cada momento para recorrer la mañana.'}
        </Reveal>
      </div>

      <Reveal i={2} className="clock" aria-hidden="true">
        <div className="track">
          <div className="gap-base" style={{ left: `${pos(7)}%`, width: `${pos(14) - pos(7)}%` }} />
          <div className="gap-fill" style={{ left: `${pos(7)}%`, width: `${pos(14) - pos(7)}%`, transform: `scaleX(${st.reach})` }} />
          <span className="gap-label" style={{ left: `${pos(7)}%`, opacity: k >= 3 ? 1 : 0 }}>7 horas</span>
          {[5, 7, 9, 11, 14, 15].map(h => (
            <span
              key={h}
              className={`tick${[7, 14].includes(h) ? '' : ' minor'}${h === 5 ? ' first' : ''}${h === 15 ? ' last' : ''}`}
              style={{ left: `${pos(h)}%` }}
            >
              {String(h).padStart(2, '0')}:00
            </span>
          ))}
        </div>
      </Reveal>

      <label className="vh" htmlFor="scrub">Momento de la mañana</label>
      <input
        type="range"
        id="scrub"
        min="0"
        max={STATIONS.length - 1}
        step="1"
        value={k}
        aria-valuetext={`${st.when}: ${st.what}`}
        onChange={e => setK(+e.target.value)}
      />

      {stepper ? (
        <div className="stepper" onTouchStart={swipeStart} onTouchEnd={swipeEnd}>
          <article className="station on" key={k} aria-live="polite">
            <span className="when">{st.when}</span>
            <span className="what">{st.what}</span>
            <span className="why">{st.why}</span>
          </article>
          <div className="stepper-ctl">
            <button type="button" onClick={() => setK(v => Math.max(0, v - 1))} disabled={k === 0} aria-label="Momento anterior">←</button>
            <span className="dots" aria-hidden="true">
              {STATIONS.map((_, j) => <i key={j} className={j === k ? 'on' : ''} />)}
            </span>
            <button type="button" onClick={() => setK(v => Math.min(STATIONS.length - 1, v + 1))} disabled={k === STATIONS.length - 1} aria-label="Momento siguiente">→</button>
          </div>
        </div>
      ) : (
        <ol className="stations">
          {STATIONS.map((s, j) => (
            <li key={s.when} className={`station${j === k ? ' on' : ''}`}>
              <button type="button" onClick={() => setK(j)} aria-pressed={j === k}>
                <span className="when">{s.when}</span>
                <span className="what">{s.what}</span>
                <span className="why">{s.why}</span>
              </button>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

function VictimRow({ v, i }) {
  const [ref, seen] = useInView({ rootMargin: '0px 0px -15% 0px' });
  const [lit, setLit] = useState(false);
  useEffect(() => {
    if (!seen) return;
    const t = setTimeout(() => setLit(true), (i % 5) * 110);
    return () => clearTimeout(t);
  }, [seen]);
  return (
    <li ref={ref} className={lit ? 'lit' : ''}>
      <i className="flame" />
      <span className="n">{v.name}</span>
      <span className="v">{v.age} · {v.role}</span>
    </li>
  );
}

export function Victims() {
  return (
    <Split
      reverse
      images={[{ src: IMAGES.frailejon, w: 1920, h: 1440, pos: '40% 50%' }]}
      caption="Frailejón, planta del páramo"
      note="Imagen de referencia"
    >
      <section className="victims" id="victimas" data-stage="0">
        <Reveal as="h2">Sus nombres</Reveal>
        <Reveal as="p" i={1} className="sub">Ninguno de los dieciocho ocupantes tenía relación con grupos armados. Nombre, edad y oficio, según el registro del Cinep.</Reveal>
        <ul className="names">
          {VICTIMS.map((v, i) => <VictimRow key={v.name} v={v} i={i} />)}
        </ul>
        <Reveal as="p" className="survivors">Sobrevivieron dos niños, de 8 y 11 años, y una mujer mayor. Las fuentes no coinciden en sus edades exactas.</Reveal>
      </section>
    </Split>
  );
}

export function Figures() {
  const [ref, seen] = useInView();
  return (
    <section className="figures" id="cifras">
      <Reveal as="h2">Lo que dicen las cifras</Reveal>
      <div className={`mosaic${seen ? ' in' : ''}`} ref={ref}>
        <div className="ph">
          <img src={IMAGES.consuelo1} alt="Páramo del Consuelo, Boyacá: frailejones entre rocas y pajonal bajo un cielo nublado" width="1920" height="1440" loading="lazy" />
        </div>
        <div className="tiles">
          <Reveal className="tile"><b>15</b><span>de los 18 ocupantes del bus fueron asesinados.</span></Reveal>
          <Reveal className="tile" i={1}><b>7 h</b><span>tardaron las autoridades en llegar al lugar de los hechos.</span></Reveal>
        </div>
      </div>
      <p className="note">El primer reporte del fallo del Consejo de Estado habló de 11 personas; los registros de memoria del Cinep y de Rutas del Conflicto documentan 15 víctimas con nombre propio. Foto: páramo del Consuelo, Boyacá (no es el lugar de los hechos).</p>
    </section>
  );
}

export function Justice() {
  return (
    <Split
      images={[{ src: IMAGES.aquitania, w: 1280, h: 960 }]}
      caption="Iglesia de Aquitania"
      note="Municipio donde está La Sarna"
    >
      <section className="justice" id="justicia" data-stage="0">
        <Reveal as="h2">El largo juicio</Reveal>
        <ol className="years">
          {YEARS.map(y => (
            <Reveal as="li" key={y.y + y.title}>
              <span className="y">{y.y}</span>
              <div className="t"><b>{y.title}</b><p>{y.text}</p></div>
            </Reveal>
          ))}
        </ol>
      </section>
    </Split>
  );
}

export function Ruling() {
  return (
    <section className="ruling" id="sentencia">
      <Reveal as="article" className="sheet">
        <h2>La sentencia de 2019</h2>
        <p className="meta">Sentencia del 27 de agosto de 2019 · Expediente 15001-23-31-000-2003-03453-01</p>
        <p>El tribunal no exigió que las víctimas hubieran pedido protección: <mark>el contexto de violencia y la sistematicidad de los hechos bastaban</mark> para que el Estado estuviera obligado a actuar con diligencia. Calificó lo ocurrido como un crimen de guerra.</p>
        <h3>Responsables</h3>
        <ul>
          <li>Ministerio de Defensa, Ejército Nacional y Policía Nacional.</li>
          <li>Por omisión: no se instaló el retén de El Crucero, se ignoraron los panfletos y la fuerza pública llegó siete horas tarde.</li>
          <li>Por connivencia: según los procesos penales, agentes del Estado abrieron espacios de operación y de fuga a los paramilitares.</li>
        </ul>
        <h3>Reparación</h3>
        <ul>
          <li>Cerca de 2.877 millones de pesos por daño material, daño moral y alteración de las condiciones de existencia.</li>
          <li>Un acto público, transmitido por canales estatales, en el que el presidente o su delegado pida perdón a las familias y al país, con presencia de ministros y comandantes.</li>
          <li>Honrar la memoria de las víctimas y apoyar a la Fiscalía para esclarecer la verdad.</li>
        </ul>
      </Reveal>
      <div className="stub"><span>Estado del cumplimiento</span><span>Pendiente, según el Cinep (2022)</span></div>
    </section>
  );
}

// Quince veletas en una, dos o tres filas según el ancho disponible
function Vanes({ screen }) {
  const perRow = screen.phone ? 5 : screen.compact ? 8 : 15;
  const rows = Math.ceil(VICTIMS.length / perRow);
  const cell = 100, rowH = 300;
  const width = perRow * cell, height = rows * rowH;
  const [sel, setSel] = useState(null);
  const svgRef = useRef(null);
  const rotRefs = useRef([]);

  useEffect(() => {
    if (screen.reduce) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const r = svgRef.current?.getBoundingClientRect();
        if (r) {
          const p = 1 - r.top / innerHeight;
          rotRefs.current.forEach((g, i) => g && (g.style.transform = `scaleX(${Math.cos(p * 3 + i * 0.7).toFixed(3)})`));
        }
        ticking = false;
      });
    };
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, [screen.reduce]);

  const v = sel != null ? VICTIMS[sel] : null;
  return (
    <Reveal i={2} className="vanes">
      <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} role="group" aria-label="Quince veletas y quince cruces, una por cada víctima">
        {VICTIMS.map((vic, i) => {
          const x = (i % perRow) * cell + cell / 2;
          const base = Math.floor(i / perRow) * rowH + rowH;
          const h = 150 + ((i * 37) % 5) * 9;
          const top = base - h;
          const pick = () => setSel(i);
          return (
            <g
              key={vic.name}
              className={`vane${sel === i ? ' sel' : ''}`}
              tabIndex={0}
              role="button"
              aria-label={`${vic.name}, ${vic.age} años, ${vic.role}`}
              onClick={pick}
              onMouseEnter={pick}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } }}
            >
              <rect x={x - 30} y={top - 24} width="64" height={h + 24} fill="transparent" />
              <rect className="pole" x={x - 2} y={top} width="4" height={h - 40} />
              <g className="rot" ref={el => (rotRefs.current[i] = el)}>
                <path className="blade" d={`M${x} ${top - 4} L${x + 34} ${top - 18} L${x + 26} ${top} L${x + 34} ${top + 16} Z`} />
                <path className="blade" d={`M${x} ${top - 4} L${x - 30} ${top - 8} L${x - 30} ${top + 2} Z`} />
              </g>
              <rect className="cross" x={x - 3} y={base - 50} width="6" height="50" />
              <rect className="cross" x={x - 16} y={base - 38} width="32" height="6" />
            </g>
          );
        })}
      </svg>
      <p className="vane-name" aria-live="polite">
        {v ? <><b>{v.name}</b>, {v.age} · {v.role}.</> : 'Cada veleta lleva el nombre de una de las quince personas asesinadas.'}
      </p>
    </Reveal>
  );
}

function Reel({ items }) {
  const ref = useRef(null);
  const drag = useRef(null);
  const [dragging, setDragging] = useState(false);

  const down = e => {
    if (e.pointerType !== 'mouse') return;
    drag.current = { x: e.clientX, left: ref.current.scrollLeft };
    setDragging(true);
  };
  const move = e => { if (drag.current) ref.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x); };
  useEffect(() => {
    const up = () => { drag.current = null; setDragging(false); };
    addEventListener('pointerup', up);
    return () => removeEventListener('pointerup', up);
  }, []);

  const fig = (it, cls = '') => (
    <figure className={cls} key={it.src + cls}>
      <img src={it.src} alt={it.alt} width={it.w} height={it.h} loading="lazy" style={it.pos ? { objectPosition: it.pos } : undefined} />
      <figcaption>{it.cap}</figcaption>
    </figure>
  );

  return (
    <div
      ref={ref}
      className={`reel${dragging ? ' drag' : ''}`}
      tabIndex={0}
      aria-label="Galería de paisajes de páramo"
      onPointerDown={down}
      onPointerMove={move}
    >
      {items.map((it, k) => it.kind === 'pair'
        ? <div className="pair" key={k}>{it.items.map(p => fig(p))}</div>
        : fig(it, it.kind))}
    </div>
  );
}

export function Memory({ screen, reel }) {
  return (
    <section className="memory" id="memoria">
      <div className="memory-head">
        <Reveal as="h2">Quince veletas</Reveal>
        <Reveal as="p" i={1}>En el páramo, el lugar de memoria tiene quince veletas, quince cruces, una placa, una valla y un mural. El viento mueve cada veleta. {screen.touch ? 'Toque' : 'Señale'} una para leer el nombre.</Reveal>
      </div>

      <Vanes screen={screen} />

      <div className="rituals">
        {RITUALS.map((r, i) => (
          <Reveal key={r.title} i={i}><h3>{r.title}</h3><p>{r.text}</p></Reveal>
        ))}
      </div>

      <Reveal as="p" className="slogan">«¡Mantengamos encendida la luz de la memoria!»</Reveal>

      <div className="reel-head">
        <Reveal as="h2">El páramo</Reveal>
        <Reveal as="span" i={1}>Paisajes de páramo de Boyacá y Cundinamarca. {screen.touch ? 'Deslice' : 'Arrastre'} para ver más. Son imágenes de contexto, no del lugar de los hechos.</Reveal>
      </div>
      <Reel items={reel} />
    </section>
  );
}

export function Think() {
  return (
    <section className="think" id="discusion">
      <Reveal as="h2">Preguntas para la filosofía política</Reveal>
      <Reveal as="p" i={1}>La Sarna no es solo un crimen de un grupo armado ilegal. Es un caso en el que el propio Estado aparece del lado de quienes mataron. Cuatro preguntas para discutir.</Reveal>
      <div className="qs">
        {QUESTIONS.map((q, i) => (
          <Reveal key={q.q} i={i}>
            <h3>{q.q}</h3>
            <p>{q.text}</p>
            <span className="who">{q.who}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
