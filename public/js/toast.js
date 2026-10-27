import { icono } from './icons.js';

let temporizador;

export function toast(texto, nombreIcono = 'check') {
  const el = document.getElementById('toast');
  el.innerHTML = `
    <div class="animate-toast absolute bottom-24 left-1/2 flex w-[calc(100%-2rem)] max-w-sm items-center gap-3 rounded-2xl bg-aurora-500 px-4 py-3 text-sm font-medium text-noche-950 shadow-lg shadow-black/40">
      ${icono(nombreIcono, 'size-5 shrink-0')}
      <span>${texto}</span>
    </div>`;
  clearTimeout(temporizador);
  temporizador = setTimeout(() => (el.innerHTML = ''), 2600);
}
