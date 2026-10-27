import { icono } from '../icons.js';
import { escapar } from '../texto.js';
import { responder, saludo } from '../ia/copiloto.js';

let revelando;

// Cada palabra va en su propio span para poder "escribirla" de a una.
function formatear(texto, visible) {
  const clase = visible ? 'palabra on' : 'palabra';
  return texto
    .split('\n')
    .map((linea) => {
      if (!linea.trim()) return '<div class="h-2"></div>';
      const vineta = linea.startsWith('- ');
      const html = (vineta ? linea.slice(2) : linea)
        .split(/(\*\*[^*]+\*\*)/)
        .map((seg) => {
          const negrita = seg.startsWith('**');
          const palabras = escapar(negrita ? seg.slice(2, -2) : seg)
            .split(/(\s+)/)
            .map((w) => (!w.trim() ? w : `<span class="${clase}">${w}</span>`))
            .join('');
          return negrita ? `<strong class="font-semibold text-white">${palabras}</strong>` : palabras;
        })
        .join('');
      return `<p class="${vineta ? 'pl-4 -indent-3' : ''}">${vineta ? '• ' : ''}${html}</p>`;
    })
    .join('');
}

function avatar() {
  return `<span class="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-aurora-400 to-aurora-600 text-noche-950">${icono('copiloto', 'size-4')}</span>`;
}

function burbuja(m, esUltima, state) {
  if (m.de === 'yo') {
    return `<div class="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-aurora-500 px-4 py-2.5 text-sm font-medium text-noche-950">${escapar(m.texto)}</div>`;
  }
  const extras = [
    ...(m.acciones ?? []).filter((a) => !(a.hacer === 'alarma' && state.alarma)).map((a) =>
      a.go
        ? `<button data-go="${a.go}" data-id="${a.id ?? ''}" class="rounded-full bg-aurora-500 px-3.5 py-2 text-xs font-bold text-noche-950 active:bg-aurora-400">${a.label}</button>`
        : `<button data-action="hacer" data-que="${a.hacer}" class="rounded-full bg-aurora-500 px-3.5 py-2 text-xs font-bold text-noche-950 active:bg-aurora-400">${a.label}</button>`,
    ),
    ...(esUltima ? m.siguientes ?? [] : []).map(
      (q) => `<button data-action="preguntar" data-q="${escapar(q)}" class="rounded-full px-3.5 py-2 text-xs font-medium text-aurora-400 ring-1 ring-aurora-500/40 active:bg-aurora-500/10">${q}</button>`,
    ),
  ];
  return `
    <div class="flex gap-2" ${m.nuevo ? 'data-nuevo' : ''}>
      ${avatar()}
      <div class="min-w-0 flex-1 space-y-2">
        <div class="space-y-1 rounded-2xl rounded-tl-md bg-noche-800 px-4 py-3 text-sm leading-relaxed text-slate-200 ring-1 ring-noche-700">${formatear(m.texto, !m.nuevo)}</div>
        ${extras.length ? `<div class="flex flex-wrap gap-2 transition-opacity duration-300 ${m.nuevo ? 'opacity-0' : ''}" data-extras>${extras.join('')}</div>` : ''}
      </div>
    </div>`;
}

const escribiendo = `
  <div class="flex gap-2">
    ${avatar()}
    <div class="flex items-center gap-1 rounded-2xl rounded-tl-md bg-noche-800 px-4 py-3.5 ring-1 ring-noche-700" aria-label="El Copiloto está escribiendo">
      <span class="size-2 animate-bounce rounded-full bg-noche-400"></span>
      <span class="size-2 animate-bounce rounded-full bg-noche-400 [animation-delay:150ms]"></span>
      <span class="size-2 animate-bounce rounded-full bg-noche-400 [animation-delay:300ms]"></span>
    </div>
  </div>`;

function contestar(c, mensaje) {
  c.state.escribiendo = false;
  c.state.chat.push({ acciones: [], siguientes: [], ...mensaje, de: 'ia', nuevo: true });
  if (c.state.pantalla === 'copiloto') c.render();
}

export const copiloto = {
  id: 'copiloto',
  titulo: 'Copiloto',
  render: ({ state, viaje }) => {
    if (!state.chat.length) state.chat.push({ ...saludo(viaje), de: 'ia', nuevo: true });
    const ultima = state.chat.findLastIndex((m) => m.de === 'ia');
    return `
    <div class="flex flex-1 flex-col">
      <div class="flex-1 space-y-4 p-4">
        <div class="flex items-center gap-3 rounded-2xl bg-noche-800/60 p-3 ring-1 ring-noche-700">
          ${avatar()}
          <div class="min-w-0">
            <p class="text-sm font-semibold">Copiloto <span class="ml-1 rounded bg-aurora-500/15 px-1.5 py-0.5 text-[10px] font-bold text-aurora-400">IA</span></p>
            <p class="text-xs text-noche-400">Conoce tu itinerario, tus documentos y el estado de tu vuelo</p>
          </div>
        </div>
        ${state.chat.map((m, i) => burbuja(m, i === ultima && !state.escribiendo, state)).join('')}
        ${state.escribiendo ? escribiendo : ''}
      </div>
      <form data-action="preguntar" class="sticky bottom-0 flex gap-2 border-t border-noche-800 bg-noche-900/95 p-3 backdrop-blur">
        <input name="q" autocomplete="off" enterkeyhint="send" placeholder="Preguntale lo que necesites…" aria-label="Tu pregunta"
          class="min-w-0 flex-1 rounded-full bg-noche-800 px-4 py-3 text-base text-slate-100 ring-1 ring-noche-700 outline-none placeholder:text-noche-400 focus:ring-aurora-500 sm:text-sm" />
        <button class="grid size-12 shrink-0 place-items-center rounded-full bg-aurora-500 text-noche-950 active:bg-aurora-400" aria-label="Enviar">${icono('enviar', 'size-5')}</button>
      </form>
    </div>`;
  },
  montar: (vista, { state }) => {
    clearInterval(revelando);
    vista.scrollTop = vista.scrollHeight;
    const nuevo = vista.querySelector('[data-nuevo]');
    if (!nuevo) return;
    state.chat.forEach((m) => (m.nuevo = false));
    const palabras = [...nuevo.querySelectorAll('.palabra')];
    let i = 0;
    revelando = setInterval(() => {
      palabras[i++]?.classList.add('on');
      if (i % 6 === 0) vista.scrollTop = vista.scrollHeight;
      if (i >= palabras.length) {
        clearInterval(revelando);
        nuevo.querySelector('[data-extras]')?.classList.remove('opacity-0');
        vista.scrollTop = vista.scrollHeight;
      }
    }, 28);
  },
  acciones: {
    preguntar: (c, el) => {
      const pregunta = (el.dataset.q ?? new FormData(el).get('q') ?? '').toString().trim();
      if (!pregunta || c.state.escribiendo) return;
      c.state.chat.push({ de: 'yo', texto: pregunta });
      c.state.escribiendo = true;
      c.render();
      setTimeout(() => contestar(c, responder(pregunta, c.viaje, c.state)), 700 + Math.min(pregunta.length * 15, 600));
    },
    hacer: (c, el) => {
      if (el.dataset.que !== 'alarma') return;
      c.state.alarma = true;
      c.toast(`Alarma puesta para las ${c.viaje.alarma}`, 'alarma');
      contestar(c, {
        texto: `Listo, tu alarma está puesta a las **${c.viaje.alarma}**. Que descanses: si el vuelo cambia, te despierto antes.`,
        siguientes: ['Avisar a mi familia', '¿A qué hora sale mi vuelo?'],
      });
    },
  },
};
