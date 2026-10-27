import { icono } from '../icons.js';
import { ahora, hhmm } from '../tiempo.js';

function escapar(texto) {
  return texto.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
}

function inicial(nombre) {
  return nombre.trim()[0].toUpperCase();
}

function enviado({ viaje, state }) {
  const nombres = viaje.contactos.filter((c) => state.aviso.para.includes(c.id)).map((c) => c.nombre);
  return `
    <div class="space-y-4 p-4">
      <section class="rounded-3xl bg-noche-800 p-6 text-center ring-1 ring-noche-700">
        <span class="mx-auto grid size-14 place-items-center rounded-full bg-aurora-500 text-noche-950">${icono('check', 'size-7')}</span>
        <h2 class="mt-4 text-xl font-bold">Mensaje enviado</h2>
        <p class="mt-1 text-sm text-noche-300">A ${nombres.join(' y ')} · ${state.aviso.hora}</p>
      </section>
      <div class="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-aurora-500/15 p-4 text-sm text-slate-100 ring-1 ring-aurora-500/30">
        ${escapar(state.aviso.texto)}
        <p class="mt-2 text-right text-[11px] text-aurora-400">${state.aviso.hora} ✓✓</p>
      </div>
      <button data-go="plan" class="w-full rounded-xl bg-aurora-500 py-3.5 text-sm font-bold text-noche-950 active:bg-aurora-400">Volver a mi plan</button>
      <button data-action="otro" class="w-full py-2 text-sm text-noche-300">Enviar otro mensaje</button>
    </div>`;
}

export const avisar = {
  id: 'avisar',
  titulo: 'Avisar a mi gente',
  tab: 'plan',
  render: (c) => {
    const { viaje, state } = c;
    if (state.aviso) return enviado(c);
    const hay = state.destinatarios.length > 0;
    return `
    <div class="space-y-4 p-4">
      <p class="text-sm text-noche-300">Te armamos un mensaje con lo que pasó y tu nuevo horario. Elegí a quién mandárselo.</p>

      <section>
        <h3 class="mb-2 text-xs font-semibold uppercase tracking-wide text-noche-400">Para</h3>
        <ul class="space-y-2">
          ${viaje.contactos.map((ct) => {
            const on = state.destinatarios.includes(ct.id);
            return `
            <li>
              <button data-action="destinatario" data-id="${ct.id}" aria-pressed="${on}"
                class="flex w-full items-center gap-3 rounded-2xl p-3 text-left ring-1 ${on ? 'bg-aurora-500/10 ring-aurora-500/50' : 'bg-noche-800 ring-noche-700'}">
                <span class="grid size-10 place-items-center rounded-full bg-noche-700 font-semibold">${inicial(ct.nombre)}</span>
                <span class="flex-1"><span class="block text-sm font-semibold">${ct.nombre}</span><span class="block text-xs text-noche-400">${ct.sub}</span></span>
                <span class="grid size-6 place-items-center rounded-full ${on ? 'bg-aurora-500 text-noche-950' : 'ring-2 ring-noche-600'}">${on ? icono('check', 'size-4') : ''}</span>
              </button>
            </li>`;
          }).join('')}
        </ul>
      </section>

      <section>
        <label for="mensaje" class="mb-2 block text-xs font-semibold uppercase tracking-wide text-noche-400">Mensaje</label>
        <textarea id="mensaje" data-input="mensaje" rows="6"
          class="w-full resize-none rounded-2xl bg-noche-800 p-4 text-sm leading-relaxed text-slate-100 ring-1 ring-noche-700 outline-none focus:ring-aurora-500">${escapar(state.mensaje)}</textarea>
      </section>

      <button data-action="enviar" ${hay ? '' : 'disabled'}
        class="flex w-full items-center justify-center gap-2 rounded-xl bg-aurora-500 py-3.5 text-sm font-bold text-noche-950 active:bg-aurora-400 disabled:opacity-40">
        ${icono('enviar', 'size-5')} Enviar${hay ? ` a ${state.destinatarios.length}` : ''}
      </button>
    </div>`;
  },
  acciones: {
    destinatario: ({ state, render }, el) => {
      const id = el.dataset.id;
      state.destinatarios = state.destinatarios.includes(id)
        ? state.destinatarios.filter((x) => x !== id)
        : [...state.destinatarios, id];
      render();
    },
    mensaje: ({ state }, el) => {
      state.mensaje = el.value;
    },
    enviar: ({ state, render, toast }) => {
      if (!state.destinatarios.length || !state.mensaje.trim()) return;
      state.aviso = { para: [...state.destinatarios], texto: state.mensaje.trim(), hora: hhmm(ahora()) };
      render();
      toast('Tu gente ya sabe cómo estás', 'enviar');
    },
    otro: ({ state, render }) => {
      state.aviso = null;
      render();
    },
  },
};
