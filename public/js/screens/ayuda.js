import { icono } from '../icons.js';

export const ayuda = {
  id: 'ayuda',
  titulo: 'Hablar con una persona',
  render: ({ viaje }) => `
    <div class="space-y-4 p-4">
      <section class="rounded-3xl bg-noche-800 p-5 ring-1 ring-noche-700">
        <h2 class="text-lg font-bold">Tu plan ya está resuelto</h2>
        <p class="mt-1 text-sm text-noche-300">
          Vuelo, asientos y hotel están confirmados por ${viaje.aerolinea}. Si algo no te cierra o querés que te lo confirme una persona, estos son tus contactos.
        </p>
        <button data-go="copiloto" class="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-noche-700 py-3 text-sm font-semibold active:bg-noche-600">
          ${icono('copiloto', 'size-4 text-aurora-400')} Preguntarle primero al Copiloto
        </button>
      </section>

      <ul class="space-y-3">
        ${viaje.ayuda.map((a, i) => `
          <li class="rounded-2xl bg-noche-800 p-4 ring-1 ring-noche-700">
            <div class="flex gap-3">
              <span class="grid size-10 shrink-0 place-items-center rounded-xl bg-noche-700 text-aurora-400">${icono(a.icono, 'size-5')}</span>
              <div class="flex-1">
                <p class="font-semibold">${a.titulo}</p>
                <p class="text-xs text-noche-400">${a.detalle}</p>
              </div>
            </div>
            <button data-action="contactar" data-i="${i}" class="mt-3 w-full rounded-xl py-2.5 text-sm font-semibold text-aurora-400 ring-1 ring-aurora-500/40 active:bg-aurora-500/10">${a.boton}</button>
          </li>`).join('')}
      </ul>
    </div>`,
  acciones: {
    contactar: ({ viaje, toast }, el) => {
      const a = viaje.ayuda[Number(el.dataset.i)];
      toast(a.aviso, a.icono);
    },
  },
};
