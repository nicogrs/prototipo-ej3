import { lock } from './lock.js';
import { plan } from './plan.js';
import { pase } from './pase.js';
import { descanso } from './descanso.js';
import { avisar } from './avisar.js';
import { docs, doc } from './docs.js';
import { ayuda } from './ayuda.js';
import { copiloto } from './copiloto.js';

// La primera pantalla de la lista es la de inicio.
export const pantallas = [lock, plan, pase, descanso, avisar, docs, doc, ayuda, copiloto];
