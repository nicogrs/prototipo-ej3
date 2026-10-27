# Copiloto de imprevistos

Prototipo navegable, pensado para celular, de un acompañante digital de viaje: cuando algo se sale del plan, le muestra al viajero qué pasó, en qué paso está, qué sigue y cuánto falta.

**Escenario:** Santiago vuelve de Nueva York con su pareja. El vuelo llega atrasado a Bogotá y pierde la conexión a Montevideo. Son las 03:05 y le llega una notificación.

> Los datos (vuelos, hotel, aerolínea) son de ejemplo y el Copiloto IA es representativo: responde con un guion basado en el itinerario, sin conexión a ningún modelo real.

## Pantallas

| Pantalla | Qué muestra |
|---|---|
| Notificación | Pantalla bloqueada a las 03:05: "Perdiste tu conexión. Ya tenés un vuelo nuevo y hotel" |
| Plan | Qué pasó, cuenta regresiva al embarque, próximo paso y línea de tiempo (listo → ahora → lo que sigue) |
| Pase | Tarjeta de embarque re-chequeada, disponible sin conexión, para los dos pasajeros |
| Copiloto IA | Chat que responde qué pasó, qué hacer, si puede dormir, dónde está la reserva, si es oficial, etc. y ejecuta acciones (poner alarma, abrir documentos) |
| Descansar | Alarma a las 05:45 y aviso si el vuelo cambia |
| Avisar a mi gente | Mensaje armado para el grupo y la familia |
| Docs | Reserva de hotel, tarjetas de embarque, seguro y pasaporte sin conexión |
| Ayuda | Mostrador, agencia y asistencia al viajero |

Recargar la página reinicia el recorrido (el estado vive en memoria).

## Stack

- HTML + JavaScript (módulos ES, sin framework)
- Tailwind CSS v4 con la CLI

```
public/            ← lo que se publica
  index.html
  js/app.js        ← router, estado y eventos
  js/data.js       ← datos de ejemplo del viaje
  js/ia/           ← motor del Copiloto IA
  js/screens/      ← una pantalla por archivo
src/styles.css     ← entrada de Tailwind (genera public/assets/app.css)
```

## Desarrollo

```bash
npm install
npm run dev      # Tailwind en modo watch
npm run serve    # sirve public/ en http://localhost:3000
```

## Deploy en Vercel

El repo ya incluye `vercel.json` (build `npm run build`, salida `public/`). En Vercel: **Add New → Project**, importar el repo y usar `main` como rama de producción.

## Flujo de trabajo

Gitflow: `feature/*` salen de `develop`, las versiones se cierran en `release/*` y se publican en `main` con un tag.
