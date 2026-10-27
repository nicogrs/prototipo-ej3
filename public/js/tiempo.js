import { viaje } from './data.js';

// Reloj simulado: arranca a la hora de la notificación y avanza en tiempo real.
const inicioReal = Date.now();
const inicioSimulado = aSegundos(viaje.inicio);

function aSegundos(hora) {
  const [h, m] = hora.split(':').map(Number);
  return h * 3600 + m * 60;
}

export function ahora() {
  return inicioSimulado + Math.floor((Date.now() - inicioReal) / 1000);
}

export function hhmm(segundos) {
  const h = Math.floor(segundos / 3600) % 24;
  const m = Math.floor((segundos % 3600) / 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function faltan(hora) {
  return Math.max(0, aSegundos(hora) - ahora());
}

export function duracion(segundos) {
  const h = Math.floor(segundos / 3600);
  const m = Math.floor((segundos % 3600) / 60);
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}
