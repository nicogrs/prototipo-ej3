import { icono } from '../icons.js';
import { faltan, duracion } from '../tiempo.js';

function interruptor(accion, activo, etiqueta) {
  return `
    <button data-action="${accion}" role="switch" aria-checked="${activo}" aria-label="${etiqueta}"
      class="relative h-7 w-12 shrink-0 rounded-full transition ${activo ? 'bg-aurora-500' : 'bg-noche-600'}">
      <span class="absolute top-1 size-5 rounded-full bg-white shadow transition-all ${activo ? 'left-6' : 'left-1'}"></span>
    </button>`;
}

export const descanso = {
  id: 'descanso',
  titulo: 'Descansar',
  tab: 'plan',
  render: ({ viaje, state }) => {
    const { vueloNuevo: v, hotel } = viaje;
    const manana = [
      { hora: viaje.alarma, texto: 'Suena tu alarma', icono: 'alarma' },
      { hora: hotel.trasladoVuelta.hora, texto: `Traslado desde el ${hotel.trasladoVuelta.punto.toLowerCase()}`, icono: 'cama' },
      { hora: v.embarque, texto: `Embarque en la puerta ${v.puerta}`, icono: 'pase' },
      { hora: v.salida, texto: `Despega el ${v.numero}`, icono: 'avion' },
    ];
    return `
    <div class="space-y-4 p-4">
      <section class="rounded-3xl bg-gradient-to-br from-noche-700 to-noche-800 p-5 ring-1 ring-noche-600">
        <span class="grid size-11 place-items-center rounded-2xl bg-noche-900 text-alerta-400">${icono('luna', 'size-6')}</span>
        <h2 class="mt-3 text-2xl font-bold">Podés dormir tranquilo</h2>
        <p class="mt-1 text-sm text-noche-300">Tu vuelo y tus asientos ya están confirmados. Te despertamos a tiempo y te avisamos si algo cambia.</p>
      </section>

      <section class="rounded-3xl bg-noche-800 p-5 ring-1 ring-noche-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs text-noche-400">Alarma</p>
            <p class="text-5xl font-light tabular-nums">${viaje.alarma}</p>
            <p class="mt-1 text-xs text-noche-400">Podés dormir <span data-tick="faltan" data-hasta="${viaje.alarma}">${duracion(faltan(viaje.alarma))}</span></p>
          </div>
          ${state.alarma ? `<span class="inline-flex items-center gap-1.5 rounded-full bg-aurora-500/15 px-3 py-1.5 text-sm font-semibold text-aurora-400">${icono('check', 'size-4')} Puesta</span>` : ''}
        </div>
        ${state.alarma
          ? `<button data-action="alarma" class="mt-4 w-full rounded-xl py-3 text-sm font-medium text-noche-300 ring-1 ring-noche-600 active:bg-noche-700">Quitar alarma</button>`
          : `<button data-action="alarma" class="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-aurora-500 py-3.5 text-sm font-bold text-noche-950 active:bg-aurora-400">${icono('alarma', 'size-5')} Poner alarma a las ${viaje.alarma}</button>`}
      </section>

      <section class="flex items-center gap-4 rounded-3xl bg-noche-800 p-5 ring-1 ring-noche-700">
        <span class="grid size-10 shrink-0 place-items-center rounded-xl bg-noche-700 text-aurora-400">${icono('campana', 'size-5')}</span>
        <div class="flex-1">
          <p class="text-sm font-semibold">Avisarme si el vuelo cambia</p>
          <p class="text-xs text-noche-400">Te despertamos aunque sea antes de la alarma</p>
        </div>
        ${interruptor('cambios', state.avisarCambios, 'Avisarme si el vuelo cambia')}
      </section>

      <section class="rounded-3xl bg-noche-800 p-5 ring-1 ring-noche-700">
        <h3 class="mb-3 font-semibold">Así sigue tu mañana</h3>
        <ul class="divide-y divide-noche-700">
          ${manana.map((m) => `
            <li class="flex items-center gap-3 py-3">
              <span class="text-noche-400">${icono(m.icono, 'size-5')}</span>
              <span class="flex-1 text-sm">${m.texto}</span>
              <span class="text-sm font-semibold tabular-nums">${m.hora}</span>
            </li>`).join('')}
        </ul>
      </section>
    </div>`;
  },
  acciones: {
    alarma: ({ state, viaje, render, toast }) => {
      state.alarma = !state.alarma;
      render();
      toast(state.alarma ? `Alarma puesta para las ${viaje.alarma}` : 'Alarma quitada', state.alarma ? 'alarma' : 'check');
    },
    cambios: ({ state, render, toast }) => {
      state.avisarCambios = !state.avisarCambios;
      render();
      toast(state.avisarCambios ? 'Te avisamos si el vuelo cambia' : 'Avisos de cambios desactivados', 'campana');
    },
  },
};
