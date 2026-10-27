import { viaje } from './data.js';
import { icono } from './icons.js';
import { ahora, hhmm, faltan, duracion } from './tiempo.js';
import { toast } from './toast.js';
import { pantallas } from './screens/index.js';

const TABS = [
  { id: 'plan', label: 'Plan', icono: 'plan' },
  { id: 'pase', label: 'Pase', icono: 'pase' },
  { id: 'copiloto', label: 'Copiloto', icono: 'copiloto' },
  { id: 'docs', label: 'Docs', icono: 'docs' },
  { id: 'ayuda', label: 'Ayuda', icono: 'ayuda' },
];

// Estado en memoria: recargar la página deja todo listo para otra prueba.
const state = {
  pantalla: pantallas[0]?.id,
  params: {},
  historial: [],
  alarma: false,
  avisarCambios: true,
  pasajero: 0,
  destinatarios: ['grupo', 'mama'],
  mensaje: viaje.mensaje,
  aviso: null,
  chat: [],
};

const porId = new Map(pantallas.map((p) => [p.id, p]));
const barra = document.getElementById('barra');
const vista = document.getElementById('vista');
const tabs = document.getElementById('tabs');

function ctx() {
  return { state, viaje, go, back, render, toast };
}

function go(id, params = {}) {
  if (!porId.has(id)) return;
  if (TABS.some((t) => t.id === id)) state.historial = [];
  else state.historial.push({ pantalla: state.pantalla, params: state.params });
  state.pantalla = id;
  state.params = params;
  render();
  vista.scrollTop = 0;
}

function back() {
  const anterior = state.historial.pop();
  if (!anterior) return go('plan');
  state.pantalla = anterior.pantalla;
  state.params = anterior.params;
  render();
}

function renderBarra(p) {
  const volver = state.historial.length
    ? `<button data-back class="-ml-2 grid size-10 place-items-center rounded-full text-noche-300 active:bg-noche-800" aria-label="Volver">${icono('atras', 'size-6')}</button>`
    : '';
  return `
    <div class="flex h-14 items-center gap-1 px-4">
      ${volver}
      <h1 class="flex-1 truncate text-base font-semibold">${p.titulo}</h1>
      <span class="flex items-center gap-1.5 rounded-full bg-noche-800 px-2.5 py-1 text-xs text-noche-300">
        ${icono('reloj', 'size-3.5')}<span data-tick="hora">${hhmm(ahora())}</span> · ${viaje.ciudad}
      </span>
    </div>`;
}

function renderTabs(activa) {
  return `
    <ul class="grid grid-cols-5">
      ${TABS.map((t) => {
        const on = t.id === activa;
        if (t.id === 'copiloto') {
          return `<li><button data-go="copiloto" class="flex w-full flex-col items-center gap-1 pb-2 pt-1.5 text-[11px] font-medium ${on ? 'text-aurora-400' : 'text-noche-300'}">
            <span class="-mt-5 grid size-12 place-items-center rounded-full border-4 border-noche-900 ${on ? 'bg-aurora-400' : 'bg-aurora-500'} text-noche-950 shadow-lg shadow-aurora-500/20">${icono('copiloto', 'size-6')}</span>
            ${t.label}</button></li>`;
        }
        return `<li><button data-go="${t.id}" class="flex w-full flex-col items-center gap-1 py-2 text-[11px] font-medium ${on ? 'text-aurora-400' : 'text-noche-400'}" ${on ? 'aria-current="page"' : ''}>
          ${icono(t.icono, 'size-6')}${t.label}</button></li>`;
      }).join('')}
    </ul>`;
}

function render() {
  const p = porId.get(state.pantalla);
  if (!p) {
    vista.innerHTML = '<p class="p-6 text-noche-400">Todavía no hay pantallas.</p>';
    return;
  }
  const conMarco = p.marco !== false;
  barra.hidden = !conMarco;
  tabs.hidden = !conMarco;
  if (conMarco) {
    barra.innerHTML = renderBarra(p);
    tabs.innerHTML = renderTabs(p.tab ?? p.id);
  }
  vista.innerHTML = `<div class="animate-entrar">${p.render(ctx())}</div>`;
  p.montar?.(vista, ctx());
}

function actualizarTicks() {
  for (const el of document.querySelectorAll('[data-tick]')) {
    if (el.dataset.tick === 'hora') el.textContent = hhmm(ahora());
    if (el.dataset.tick === 'faltan') el.textContent = duracion(faltan(el.dataset.hasta));
  }
}

function accion(nombre, el, evento) {
  porId.get(state.pantalla)?.acciones?.[nombre]?.(ctx(), el, evento);
}

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-go],[data-back],[data-action]');
  if (!el || el.tagName === 'FORM') return;
  if (el.hasAttribute('data-back')) return back();
  if (el.dataset.go) return go(el.dataset.go, { ...el.dataset });
  accion(el.dataset.action, el, e);
});

document.addEventListener('submit', (e) => {
  const form = e.target.closest('form[data-action]');
  if (!form) return;
  e.preventDefault();
  accion(form.dataset.action, form, e);
});

document.addEventListener('input', (e) => {
  const el = e.target.closest('[data-input]');
  if (el) accion(el.dataset.input, el, e);
});

render();
setInterval(actualizarTicks, 1000);
