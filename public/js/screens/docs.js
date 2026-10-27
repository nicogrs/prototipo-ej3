import { icono } from '../icons.js';

export const docs = {
  id: 'docs',
  titulo: 'Mis documentos',
  render: ({ viaje }) => `
    <div class="space-y-4 p-4">
      <div class="flex items-center gap-3 rounded-2xl bg-aurora-500/10 p-4 ring-1 ring-aurora-500/30">
        <span class="text-aurora-400">${icono('offline', 'size-5')}</span>
        <p class="text-sm text-slate-200">Todo está guardado en tu celular. Lo podés mostrar aunque no tengas señal.</p>
      </div>
      <ul class="space-y-2">
        ${viaje.documentos.map((d) => `
          <li>
            <button data-go="${d.ir ?? 'doc'}" data-id="${d.id}" class="flex w-full items-center gap-3 rounded-2xl bg-noche-800 p-4 text-left ring-1 ring-noche-700 active:bg-noche-700">
              <span class="grid size-11 place-items-center rounded-xl bg-noche-700 text-aurora-400">${icono(d.icono, 'size-5')}</span>
              <span class="min-w-0 flex-1">
                <span class="block font-semibold">${d.titulo}</span>
                <span class="block truncate text-xs text-noche-400">${d.sub}</span>
              </span>
              <span class="text-noche-400">${icono('derecha', 'size-5')}</span>
            </button>
          </li>`).join('')}
      </ul>
    </div>`,
};

export const doc = {
  id: 'doc',
  titulo: 'Documento',
  tab: 'docs',
  render: ({ viaje, state }) => {
    const d = viaje.documentos.find((x) => x.id === state.params.id) ?? viaje.documentos[0];
    return `
    <div class="space-y-4 p-4">
      <article class="overflow-hidden rounded-3xl bg-slate-50 text-noche-950">
        <header class="flex items-center gap-3 bg-noche-950 px-5 py-4 text-white">
          <span class="text-aurora-400">${icono(d.icono, 'size-6')}</span>
          <h2 class="flex-1 font-bold">${d.titulo}</h2>
          <span class="inline-flex items-center gap-1 text-[11px] text-noche-300">${icono('offline', 'size-3.5')} Sin conexión</span>
        </header>
        <div class="p-5">
          <p class="text-[11px] uppercase tracking-wide text-slate-500">Número</p>
          <p class="text-3xl font-black tracking-wider">${d.codigo}</p>
          <dl class="mt-4 divide-y divide-slate-200">
            ${d.campos.map(([k, v]) => `
              <div class="flex justify-between gap-4 py-2.5 text-sm">
                <dt class="text-slate-500">${k}</dt>
                <dd class="text-right font-semibold">${v}</dd>
              </div>`).join('')}
          </dl>
        </div>
      </article>
      ${d.nota ? `<p class="rounded-2xl bg-alerta-400/10 p-4 text-sm text-alerta-400 ring-1 ring-alerta-400/30">${d.nota}</p>` : ''}
      <p class="text-center text-xs text-noche-400">Subí el brillo de la pantalla para mostrarlo en el control</p>
    </div>`;
  },
};
