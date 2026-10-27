import { icono } from '../icons.js';
import { ahora, hhmm } from '../tiempo.js';

// Pantalla bloqueada con la notificación que abre el flujo.
export const lock = {
  id: 'lock',
  titulo: 'Notificación',
  marco: false,
  render: ({ viaje }) => `
    <section class="flex min-h-dvh flex-col bg-gradient-to-b from-noche-800 via-noche-900 to-noche-950 px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(4rem,env(safe-area-inset-top))]">
      <div class="text-center">
        <p class="text-sm font-medium text-noche-300">martes 27 de octubre</p>
        <p class="mt-1 text-7xl font-light tracking-tight tabular-nums" data-tick="hora">${hhmm(ahora())}</p>
        <p class="mt-1 text-xs text-noche-400">${viaje.ciudad}, Colombia</p>
      </div>

      <button data-go="plan" class="mt-12 w-full rounded-3xl bg-white/10 p-4 text-left ring-1 ring-white/10 backdrop-blur-md transition active:scale-[0.98]">
        <div class="flex items-center gap-2 text-xs text-noche-300">
          <span class="grid size-5 place-items-center rounded-md bg-aurora-500 text-noche-950">${icono('copiloto', 'size-3.5')}</span>
          <span class="font-semibold uppercase tracking-wide">Copiloto</span>
          <span class="ml-auto">ahora</span>
        </div>
        <p class="mt-2 font-semibold">Perdiste tu conexión a ${viaje.vueloNuevo.destino.ciudad}</p>
        <p class="mt-0.5 text-sm text-slate-200">Ya tenés un vuelo nuevo y hotel. Tocá para ver qué sigue.</p>
      </button>

      <p class="mt-auto text-center text-xs text-noche-400">Tocá la notificación para abrirla</p>
    </section>`,
};
