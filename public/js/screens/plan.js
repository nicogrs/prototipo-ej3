import { icono } from '../icons.js';
import { faltan, duracion } from '../tiempo.js';

const ATAJOS = [
  { go: 'pase', icono: 'pase', titulo: 'Tarjeta de embarque', sub: 'Lista, sin conexión' },
  { go: 'descanso', icono: 'luna', titulo: 'Descansar', sub: 'Alarma 05:45' },
  { go: 'avisar', icono: 'usuarios', titulo: 'Avisar a mi gente', sub: 'Mensaje armado' },
  { go: 'ayuda', icono: 'telefono', titulo: 'Hablar con alguien', sub: 'Mostrador y agencia' },
];

function paso({ hora, titulo, detalle, estado }, ultimo) {
  const marca = {
    listo: `<span class="grid size-6 place-items-center rounded-full bg-aurora-500/15 text-aurora-400">${icono('check', 'size-3.5')}</span>`,
    ahora: '<span class="relative grid size-6 place-items-center"><span class="absolute inset-0 animate-ping rounded-full bg-alerta-400/40"></span><span class="size-3 rounded-full bg-alerta-400"></span></span>',
    sigue: '<span class="grid size-6 place-items-center"><span class="size-2.5 rounded-full border-2 border-noche-600"></span></span>',
  }[estado];
  const texto = {
    listo: 'text-noche-300',
    ahora: 'text-white font-semibold',
    sigue: 'text-slate-200',
  }[estado];
  return `
    <li class="relative flex gap-3 pb-5">
      ${ultimo ? '' : '<span class="absolute left-3 top-7 bottom-0 w-px bg-noche-700"></span>'}
      <span class="relative shrink-0">${marca}</span>
      <div class="min-w-0 flex-1 ${estado === 'ahora' ? '-mt-1 rounded-xl bg-alerta-400/10 p-3 ring-1 ring-alerta-400/30' : ''}">
        <div class="flex items-baseline justify-between gap-3">
          <p class="${texto} text-sm">${titulo}</p>
          <span class="shrink-0 text-xs tabular-nums text-noche-400">${hora}</span>
        </div>
        ${estado === 'ahora' ? '<p class="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-alerta-400">Ahora</p>' : ''}
        ${detalle ? `<p class="mt-0.5 text-xs text-noche-400">${detalle}</p>` : ''}
      </div>
    </li>`;
}

export const plan = {
  id: 'plan',
  titulo: 'Tu plan',
  render: ({ viaje }) => {
    const { vueloNuevo: v, hotel } = viaje;
    return `
    <div class="space-y-4 p-4">
      <section class="rounded-3xl bg-noche-800 p-5 ring-1 ring-noche-700">
        <span class="inline-flex items-center gap-1.5 rounded-full bg-alerta-400/15 px-2.5 py-1 text-xs font-semibold text-alerta-400">
          ${icono('avion', 'size-3.5')} Perdiste tu conexión
        </span>
        <h2 class="mt-3 text-2xl font-bold leading-tight">Ya tenés vuelo nuevo y hotel</h2>
        <p class="mt-2 text-sm text-noche-300">
          Tu vuelo desde ${viaje.vueloLlegada.desde} llegó ${viaje.vueloLlegada.atraso} tarde y el ${viaje.vueloPerdido.numero} salió a las ${viaje.vueloPerdido.salio}.
          No tenés que hacer fila en el mostrador: ya está todo resuelto.
        </p>
        <div class="mt-4 rounded-2xl bg-noche-900 p-4">
          <p class="text-xs text-noche-400">Embarcás en</p>
          <p class="whitespace-nowrap text-3xl font-bold tabular-nums text-aurora-400" data-tick="faltan" data-hasta="${v.embarque}">${duracion(faltan(v.embarque))}</p>
          <p class="mt-2 text-xs text-noche-300">
            <span class="font-semibold text-white">${v.numero} · ${v.origen.codigo} → ${v.destino.codigo}</span> · Embarque ${v.embarque} · Puerta ${v.puerta}
          </p>
        </div>
      </section>

      <section class="rounded-3xl bg-aurora-500 p-5 text-noche-950">
        <p class="text-xs font-bold uppercase tracking-wide opacity-70">Tu próximo paso</p>
        <h3 class="mt-1 text-xl font-bold">Tomá el traslado al hotel</h3>
        <p class="mt-1 text-sm font-medium">${hotel.trasladoIda.hora} · ${hotel.trasladoIda.punto}</p>
        <p class="mt-0.5 text-sm opacity-80">Sale en <span data-tick="faltan" data-hasta="${hotel.trasladoIda.hora}">${duracion(faltan(hotel.trasladoIda.hora))}</span>. Si en migración te piden la reserva, la tenés acá.</p>
        <button data-go="doc" data-id="hotel" class="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-noche-950 py-3 text-sm font-semibold text-white active:bg-noche-800">
          ${icono('cama', 'size-4')} Ver reserva del hotel
        </button>
      </section>

      <button data-go="copiloto" class="flex w-full items-start gap-3 rounded-3xl bg-noche-800 p-4 text-left ring-1 ring-aurora-500/30 active:bg-noche-700">
        <span class="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-aurora-400 to-aurora-600 text-noche-950">${icono('copiloto', 'size-5')}</span>
        <span class="min-w-0 flex-1">
          <span class="block text-xs font-semibold text-aurora-400">Copiloto IA</span>
          <span class="mt-0.5 block text-sm text-slate-200">Tenés tiempo de sobra: si dormís en el hotel, te despierto a las ${viaje.alarma} y llegás al embarque con margen.</span>
          <span class="mt-2 flex items-center gap-1 text-xs font-semibold text-noche-300">Preguntale lo que necesites ${icono('derecha', 'size-3.5')}</span>
        </span>
      </button>

      <section class="grid grid-cols-2 gap-3">
        ${ATAJOS.map((a) => `
          <button data-go="${a.go}" class="rounded-2xl bg-noche-800 p-4 text-left ring-1 ring-noche-700 active:bg-noche-700">
            <span class="grid size-9 place-items-center rounded-xl bg-noche-700 text-aurora-400">${icono(a.icono, 'size-5')}</span>
            <p class="mt-3 text-sm font-semibold">${a.titulo}</p>
            <p class="text-xs text-noche-400">${a.sub}</p>
          </button>`).join('')}
      </section>

      <section class="rounded-3xl bg-noche-800 p-5 ring-1 ring-noche-700">
        <h3 class="mb-4 font-semibold">Tu noche, paso a paso</h3>
        <ol>${viaje.linea.map((p, i) => paso(p, i === viaje.linea.length - 1)).join('')}</ol>
      </section>
    </div>`;
  },
};
