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

  documentos: [
    {
      id: 'hotel',
      titulo: 'Reserva de hotel',
      sub: 'Hotel Dorado Aeropuerto · HDA-48213',
      icono: 'cama',
      codigo: 'HDA-48213',
      campos: [
        ['Hotel', 'Hotel Dorado Aeropuerto'],
        ['Dirección', 'Av. El Dorado 103-08, Bogotá'],
        ['Huéspedes', 'Santiago Pereira, Valentina Suárez'],
        ['Entrada', 'Mar 27 oct · 03:45'],
        ['Salida', 'Mar 27 oct · 05:55'],
        ['Habitación', 'Doble · 1 noche'],
        ['Pago', 'Cubierto por Andes Air (conexión perdida)'],
      ],
    },
    { id: 'pases', titulo: 'Tarjetas de embarque', sub: 'AN 0386 · BOG → MVD · 07:10', icono: 'pase', ir: 'pase' },
    {
      id: 'seguro',
      titulo: 'Seguro de viaje',
      sub: 'Póliza AV-552190 · vigente',
      icono: 'escudo',
      codigo: 'AV-552190',
      campos: [
        ['Titulares', 'Santiago Pereira, Valentina Suárez'],
        ['Vigencia', '12 oct al 28 oct 2026'],
        ['Cobertura', 'Médica, equipaje y demoras de vuelo'],
        ['Asistencia 24 h', 'Desde la app, en la pestaña Ayuda'],
      ],
    },
    {
      id: 'pasaporte',
      titulo: 'Pasaporte',
      sub: 'Copia digital · Santiago Pereira',
      icono: 'pasaporte',
      codigo: 'C0K4829',
      campos: [
        ['Titular', 'Santiago Pereira'],
        ['Nacionalidad', 'Uruguaya'],
        ['Vence', '03 mar 2031'],
      ],
      nota: 'Es una copia de respaldo. En migración siempre te van a pedir el pasaporte físico.',
    },
  ],

  ayuda: [
    { titulo: 'Mostrador de Andes Air', detalle: 'Muelle internacional, frente a la puerta A3 · abierto 24 h', boton: 'Cómo llegar', icono: 'pin', aviso: 'Mapa del aeropuerto abierto' },
    { titulo: 'Rumbo Viajes, tu agencia', detalle: 'Guardia por WhatsApp las 24 h', boton: 'Escribir', icono: 'mensaje', aviso: 'Abriendo el chat con tu agencia' },
    { titulo: 'Asistencia al viajero', detalle: 'Incluida en tu seguro · llamada gratuita', boton: 'Llamar', icono: 'telefono', aviso: 'Llamando a asistencia al viajero' },
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
