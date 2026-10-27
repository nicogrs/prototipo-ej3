// Datos de ejemplo del viaje de Santiago: conexión perdida en Bogotá.
export const viaje = {
  inicio: '03:05',
  ciudad: 'Bogotá',
  viajero: { nombre: 'Santiago', apellido: 'Pereira' },
  acompanante: { nombre: 'Valentina', apellido: 'Suárez' },
  aerolinea: 'Andes Air',

  vueloLlegada: { numero: 'AN 0911', desde: 'Nueva York', aterrizo: '02:35', atraso: '2 h 10 min' },
  vueloPerdido: { numero: 'AN 0384', salio: '01:40' },
  vueloNuevo: {
    numero: 'AN 0386',
    origen: { codigo: 'BOG', ciudad: 'Bogotá' },
    destino: { codigo: 'MVD', ciudad: 'Montevideo' },
    fecha: 'Mar 27 oct',
    embarque: '06:30',
    salida: '07:10',
    llegada: '15:05',
    puerta: 'A7',
    grupo: 'B',
    localizador: 'QX7R4M',
    asientos: ['23C', '23D'],
  },

  hotel: {
    nombre: 'Hotel Dorado Aeropuerto',
    direccion: 'Av. El Dorado 103-08, Bogotá',
    reserva: 'HDA-48213',
    habitacion: 'Doble · 1 noche',
    incluye: 'Pagado por Andes Air · desayuno desde las 05:00',
    trasladoIda: { hora: '03:30', punto: 'Salida 3, frente a la columna 12' },
    trasladoVuelta: { hora: '05:55', punto: 'Lobby del hotel' },
  },

  alarma: '05:45',

  contactos: [
    { id: 'grupo', nombre: 'Viaje a NY', sub: 'Grupo · 6 personas' },
    { id: 'mama', nombre: 'Mamá', sub: 'WhatsApp' },
    { id: 'papa', nombre: 'Papá', sub: 'WhatsApp' },
    { id: 'agencia', nombre: 'Rumbo Viajes', sub: 'Tu agencia' },
  ],

  mensaje:
    'Hola! Perdimos la conexión en Bogotá porque el vuelo desde Nueva York llegó atrasado. Estamos bien: la aerolínea nos dio hotel y salimos 07:10 en el AN 0386. Llegamos a Montevideo 15:05. Les aviso cuando embarquemos.',

  linea: [
    { hora: '02:35', titulo: 'Aterrizaste en Bogotá', detalle: 'Tu vuelo desde Nueva York llegó 2 h 10 min tarde', estado: 'listo' },
    { hora: '02:58', titulo: 'Te pasamos al vuelo AN 0386', detalle: 'Sale 07:10 a Montevideo', estado: 'listo' },
    { hora: '03:00', titulo: 'Re-check-in hecho', detalle: 'Asientos 23C y 23D, juntos', estado: 'listo' },
    { hora: '03:01', titulo: 'Hotel confirmado', detalle: 'Hotel Dorado Aeropuerto, pagado por la aerolínea', estado: 'listo' },
    { hora: '03:30', titulo: 'Tomá el traslado al hotel', detalle: 'Pasá migración y andá a la salida 3, frente a la columna 12. Tu valija sigue despachada a Montevideo', estado: 'ahora' },
    { hora: '05:45', titulo: 'Suena tu alarma', estado: 'sigue' },
    { hora: '05:55', titulo: 'Traslado de vuelta al aeropuerto', detalle: 'Sale desde el lobby del hotel', estado: 'sigue' },
    { hora: '06:30', titulo: 'Embarque en la puerta A7', estado: 'sigue' },
    { hora: '07:10', titulo: 'Despega tu vuelo a Montevideo', estado: 'sigue' },
  ],
};
