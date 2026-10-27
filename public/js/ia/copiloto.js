// Copiloto IA representativo: interpreta la pregunta por palabras clave y
// responde con datos del itinerario. No se conecta con ningún modelo real.
import { normalizar } from '../texto.js';
import { ahora, hhmm, faltan, duracion } from '../tiempo.js';

export const SUGERENCIAS = [
  '¿Qué hago ahora?',
  '¿Puedo dormir?',
  '¿Esto es oficial?',
  '¿Y mi valija?',
  'Mostrame la reserva del hotel',
  'Quiero hablar con una persona',
];

const INTENCIONES = [
  {
    id: 'gracias',
    claves: ['gracias', 'genial', 'perfecto', 'buenisimo', 'dale'],
    responder: ({ hotel }) => ({
      texto: `De nada, para eso estoy. Lo próximo es el traslado al hotel a las **${hotel.trasladoIda.hora}**: te aviso si algo cambia.`,
      siguientes: ['¿Puedo dormir?', 'Avisar a mi familia'],
    }),
  },
  {
    id: 'que_paso',
    claves: ['que paso', 'que me paso', 'perdi', 'conexion', 'atraso', 'atrasado', 'demora', 'por que'],
    responder: (v) => ({
      texto: `Tu vuelo ${v.vueloLlegada.numero} desde ${v.vueloLlegada.desde} aterrizó a las ${v.vueloLlegada.aterrizo}, con **${v.vueloLlegada.atraso} de atraso**. Tu conexión ${v.vueloPerdido.numero} a Montevideo ya había salido a la ${v.vueloPerdido.salio}.\n\nNo tenés que hacer nada para recuperarla: ${v.aerolinea} te pasó al **${v.vueloNuevo.numero} de las ${v.vueloNuevo.salida}** y te dio hotel.`,
      acciones: [{ label: 'Ver mi plan', go: 'plan' }],
      siguientes: ['¿Qué hago ahora?', '¿Esto es oficial?'],
    }),
  },
  {
    id: 'que_hago',
    claves: ['que hago', 'que tengo que hacer', 'ahora', 'que sigue', 'siguiente', 'proximo paso', 'donde voy', 'adonde voy'],
    responder: ({ hotel }) => ({
      texto: `Tu próximo paso es **tomar el traslado al hotel a las ${hotel.trasladoIda.hora}** (sale en ${duracion(faltan(hotel.trasladoIda.hora))}).\n\n1. Pasá migración con tu pasaporte.\n2. Andá a la **${hotel.trasladoIda.punto.toLowerCase()}**.\n3. No retires la valija: sigue despachada a Montevideo.\n\nSi en migración te piden dónde vas a dormir, mostrá la reserva del hotel.`,
      acciones: [{ label: 'Ver reserva del hotel', go: 'doc', id: 'hotel' }],
      siguientes: ['¿Puedo dormir?', '¿Y mi valija?'],
    }),
  },
  {
    id: 'dormir',
    claves: ['dormir', 'duermo', 'descansar', 'sueno', 'cansado', 'cansada', 'alarma', 'despert', 'perder el vuelo'],
    responder: (v, state) => ({
      texto: `Sí, podés dormir tranquilo. Tu re-check-in ya está hecho (asientos **${v.vueloNuevo.asientos.join(' y ')}**) y la tarjeta de embarque está guardada sin conexión.\n\n${
        state.alarma
          ? `Tu alarma ya está puesta a las **${v.alarma}**.`
          : `Te sugiero una alarma a las **${v.alarma}**: te deja 10 minutos antes del traslado de las ${v.hotel.trasladoVuelta.hora} y llegás al embarque con margen.`
      } Si el vuelo cambia, te despierto antes.`,
      acciones: state.alarma
        ? [{ label: 'Ver tarjeta de embarque', go: 'pase' }]
        : [{ label: `Poner alarma ${v.alarma}`, hacer: 'alarma' }, { label: 'Ver tarjeta de embarque', go: 'pase' }],
      siguientes: ['¿A qué hora sale mi vuelo?', 'Avisar a mi familia'],
    }),
  },
  {
    id: 'hotel',
    claves: ['hotel', 'traslado', 'shuttle', 'combi', 'transfer', 'como llego', 'donde duermo'],
    responder: ({ hotel }) => ({
      texto: `Vas al **${hotel.nombre}** (${hotel.direccion}). Está pagado por la aerolínea e incluye desayuno desde las 05:00.\n\nEl traslado sale a las **${hotel.trasladoIda.hora}** desde la ${hotel.trasladoIda.punto.toLowerCase()}, y la vuelta al aeropuerto a las **${hotel.trasladoVuelta.hora}** desde el lobby.`,
      acciones: [{ label: 'Ver reserva del hotel', go: 'doc', id: 'hotel' }],
      siguientes: ['¿Puedo dormir?', '¿Esto es oficial?'],
    }),
  },
  {
    id: 'vuelo',
    claves: ['vuelo', 'sale', 'salgo', 'embarque', 'embarco', 'puerta', 'asiento', 'horario', 'a que hora', 'llegada', 'llego', 'montevideo'],
    responder: ({ vueloNuevo: v }) => ({
      texto: `Tu vuelo es el **${v.numero}** a Montevideo:\n\n- Embarque **${v.embarque}** en la puerta **${v.puerta}** (faltan ${duracion(faltan(v.embarque))})\n- Despega ${v.salida} y llega ${v.llegada}\n- Asientos ${v.asientos.join(' y ')}, juntos`,
      acciones: [{ label: 'Ver tarjeta de embarque', go: 'pase' }],
      siguientes: ['¿Puedo dormir?', '¿Esto es oficial?'],
    }),
  },
  {
    id: 'documentos',
    claves: ['reserva', 'comprobante', 'migracion', 'aduana', 'documento', 'papeles', 'pasaporte', 'seguro de viaje', 'poliza', 'me piden', 'mostra'],
    responder: (v, state, pregunta) => {
      const doc = v.documentos.find((d) => d.id !== 'hotel' && pregunta.includes(d.id)) ?? v.documentos[0];
      return {
        texto: `Acá tenés tu **${doc.titulo.toLowerCase()}**. Se abre aunque no tengas señal. El resto de tus papeles está en **Mis documentos**.`,
        acciones: [{ label: `Ver ${doc.titulo.toLowerCase()}`, go: 'doc', id: doc.id }, { label: 'Mis documentos', go: 'docs' }],
        siguientes: ['¿Qué hago ahora?'],
      };
    },
  },
  {
    id: 'valija',
    claves: ['valija', 'equipaje', 'maleta', 'bolso', 'mochila'],
    responder: () => ({
      texto: 'Tu valija **sigue despachada hasta Montevideo**: no tenés que retirarla en Bogotá. Llevá al hotel solo el equipaje de mano.\n\nSi al llegar no aparece, el reclamo se hace en Montevideo y te ayudo a armarlo.',
      siguientes: ['¿Qué hago ahora?', '¿Puedo dormir?'],
    }),
  },
  {
    id: 'oficial',
    claves: ['oficial', 'confiar', 'confio', 'seguro que', 'es real', 'verdad', 'de donde', 'quien lo confirma', 'chequeado'],
    responder: (v) => ({
      texto: `Sí. Todo viene de los sistemas de **${v.aerolinea}**: el cambio al ${v.vueloNuevo.numero} quedó registrado en tu reserva **${v.vueloNuevo.localizador}** a las 02:58 y el hotel lo paga la aerolínea.\n\nSi preferís que te lo confirme una persona, el mostrador está frente a la puerta A3 y atiende las 24 h.`,
      acciones: [{ label: 'Hablar con una persona', go: 'ayuda' }, { label: 'Ver tarjeta de embarque', go: 'pase' }],
      siguientes: ['¿Puedo dormir?'],
    }),
  },
  {
    id: 'avisar',
    claves: ['avisar', 'avisa', 'avisale', 'familia', 'mama', 'papa', 'grupo', 'mensaje', 'contarle'],
    responder: (v, state) => ({
      texto: state.aviso
        ? `Ya les avisaste a las ${state.aviso.hora}. Si querés, les mando otro mensaje cuando embarques.`
        : 'Te armé un mensaje con lo que pasó, tu vuelo nuevo y la hora de llegada. Elegí a quién mandárselo y listo.',
      acciones: state.aviso ? [] : [{ label: 'Avisar a mi gente', go: 'avisar' }],
      siguientes: ['¿Puedo dormir?'],
    }),
  },
  {
    id: 'persona',
    claves: ['persona', 'humano', 'alguien', 'mostrador', 'agencia', 'hablar', 'llamar', 'asistencia'],
    responder: (v) => ({
      texto: `Claro. Tenés el mostrador de ${v.aerolinea} (frente a la puerta A3, 24 h), tu agencia por WhatsApp y la asistencia de tu seguro.`,
      acciones: [{ label: 'Ver contactos', go: 'ayuda' }],
      siguientes: ['¿Esto es oficial?'],
    }),
  },
  {
    id: 'comida',
    claves: ['comer', 'comida', 'hambre', 'desayuno', 'cenar'],
    responder: () => ({
      texto: 'El hotel incluye **desayuno desde las 05:00**, así que podés comer algo antes del traslado de las 05:55. En el aeropuerto, pasando migración, hay cafeterías abiertas toda la noche.',
      siguientes: ['¿Qué hago ahora?'],
    }),
  },
];

export function saludo(viaje) {
  return {
    texto: `Hola, ${viaje.viajero.nombre}. Ya sé que perdiste la conexión en Bogotá, y está todo resuelto: **vuelo ${viaje.vueloNuevo.numero} a las ${viaje.vueloNuevo.salida}** y **hotel hasta las ${viaje.hotel.trasladoVuelta.hora}**.\n\nTu próximo paso es el traslado al hotel a las ${viaje.hotel.trasladoIda.hora}. ¿En qué te ayudo?`,
    siguientes: SUGERENCIAS,
  };
}

// Elige la intención con más coincidencias; las frases largas pesan más.
export function responder(pregunta, viaje, state) {
  const texto = ` ${normalizar(pregunta)} `;
  let mejor = null;
  let puntaje = 0;
  for (const intencion of INTENCIONES) {
    const p = intencion.claves.reduce((total, clave) => (texto.includes(` ${clave}`) ? total + clave.length : total), 0);
    if (p > puntaje) {
      mejor = intencion;
      puntaje = p;
    }
  }
  if (!mejor) {
    return {
      texto: `No estoy seguro de haberte entendido. Son las ${hhmm(ahora())} y lo importante ahora es el traslado al hotel. Puedo ayudarte con esto:`,
      siguientes: SUGERENCIAS,
    };
  }
  return { acciones: [], siguientes: [], ...mejor.responder(viaje, state, texto) };
}
