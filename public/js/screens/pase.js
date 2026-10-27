import { icono } from '../icons.js';

// QR decorativo y determinista a partir del texto (no es un código real).
function qr(texto) {
  const n = 25;
  let semilla = [...texto].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const azar = () => (semilla = (semilla * 1664525 + 1013904223) >>> 0) / 2 ** 32;
  const esquinas = [[0, 0], [n - 7, 0], [0, n - 7]];

  let d = '';
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const esquina = esquinas.find(([ex, ey]) => x >= ex - 1 && x <= ex + 7 && y >= ey - 1 && y <= ey + 7);
      let on;
      if (esquina) {
        const dx = x - esquina[0];
        const dy = y - esquina[1];
        const dentro = dx >= 0 && dx <= 6 && dy >= 0 && dy <= 6;
        on = dentro && (dx === 0 || dx === 6 || dy === 0 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4));
      } else {
        on = azar() > 0.5;
      }
      if (on) d += `M${x + 2} ${y + 2}h1v1h-1z`;
    }
  }
  return `<svg viewBox="0 0 ${n + 4} ${n + 4}" class="size-44 rounded-xl" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#fff"/><path d="${d}" fill="#070b16"/></svg>`;
}

function dato(etiqueta, valor, grande = false) {
  return `<div><p class="text-[11px] uppercase tracking-wide text-slate-500">${etiqueta}</p><p class="${grande ? 'text-2xl' : 'text-base'} font-bold">${valor}</p></div>`;
}

export const pase = {
  id: 'pase',
  titulo: 'Tarjeta de embarque',
  render: ({ viaje, state }) => {
    const v = viaje.vueloNuevo;
    const pasajeros = [viaje.viajero, viaje.acompanante];
    const p = pasajeros[state.pasajero];
    return `
    <div class="space-y-4 p-4">
      <div class="flex items-center justify-between">
        <span class="inline-flex items-center gap-1.5 rounded-full bg-aurora-500/15 px-2.5 py-1 text-xs font-semibold text-aurora-400">
          ${icono('offline', 'size-3.5')} Disponible sin conexión
        </span>
        <span class="text-xs text-noche-400">Re-check-in hecho 03:00</span>
      </div>

      <div class="grid grid-cols-2 rounded-xl bg-noche-800 p-1 text-sm font-medium" role="tablist">
        ${pasajeros.map((x, i) => `
          <button data-action="pasajero" data-i="${i}" role="tab" aria-selected="${i === state.pasajero}"
            class="rounded-lg py-2 ${i === state.pasajero ? 'bg-noche-600 text-white' : 'text-noche-400'}">${x.nombre}</button>`).join('')}
      </div>

      <article class="overflow-hidden rounded-3xl bg-slate-50 text-noche-950">
        <div class="flex items-center justify-between bg-noche-950 px-5 py-3 text-white">
          <span class="flex items-center gap-2 text-sm font-bold">${icono('avion', 'size-4 text-aurora-400')} ${viaje.aerolinea}</span>
          <span class="text-xs text-noche-300">${v.fecha}</span>
        </div>
        <div class="p-5">
          <div class="flex items-center justify-between">
            <div><p class="text-4xl font-black">${v.origen.codigo}</p><p class="text-xs text-slate-500">${v.origen.ciudad} · ${v.salida}</p></div>
            ${icono('avion', 'size-6 text-slate-400')}
            <div class="text-right"><p class="text-4xl font-black">${v.destino.codigo}</p><p class="text-xs text-slate-500">${v.destino.ciudad} · ${v.llegada}</p></div>
          </div>
          <p class="mt-4 text-[11px] uppercase tracking-wide text-slate-500">Pasajero</p>
          <p class="font-bold">${p.apellido.toUpperCase()} / ${p.nombre.toUpperCase()}</p>
          <div class="mt-4 grid grid-cols-4 gap-2">
            ${dato('Vuelo', v.numero.replace(' ', '&nbsp;'))}
            ${dato('Puerta', v.puerta)}
            ${dato('Asiento', v.asientos[state.pasajero])}
            ${dato('Grupo', v.grupo)}
          </div>
          <div class="mt-4 rounded-2xl bg-alerta-400/20 px-4 py-3">
            ${dato('Embarque', v.embarque, true)}
          </div>
        </div>
        <div class="relative border-t-2 border-dashed border-slate-300">
          <span class="absolute -left-3 -top-3 size-6 rounded-full bg-noche-900"></span>
          <span class="absolute -right-3 -top-3 size-6 rounded-full bg-noche-900"></span>
        </div>
        <div class="flex flex-col items-center gap-2 p-5">
          ${qr(v.localizador + p.nombre)}
          <p class="text-xs text-slate-500">Código de reserva <span class="font-bold text-noche-950">${v.localizador}</span></p>
        </div>
      </article>

      <button data-action="billetera" class="flex w-full items-center justify-center gap-2 rounded-xl bg-noche-800 py-3 text-sm font-semibold ring-1 ring-noche-700 active:bg-noche-700">
        ${icono('pase', 'size-4')} Guardar en la billetera
      </button>
    </div>`;
  },
  acciones: {
    pasajero: ({ state, render }, el) => {
      state.pasajero = Number(el.dataset.i);
      render();
    },
    billetera: ({ toast }) => toast('Tarjetas guardadas en tu billetera'),
  },
};
