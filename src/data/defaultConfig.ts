import { CoachConfig, DaySchedule, PlanTier, Testimonial, VideoSpotlightItem, FaqItem } from '../types';

export const DEFAULT_COACH_CONFIG: CoachConfig = {
  coachName: 'Coach Personal',
  brandName: 'KINETIC',
  brandDomain: 'kinetic.fit',
  coachTitle: 'Entrenador Personal Certificado · NSCA / CSCS',
  coachSpecialty: 'Fuerza, Recomposición Corporal & Salud Metabólica',
  experienceYears: 8,
  activeClientsCount: 26,
  consistencyPercentage: 94,
  phoneWhatsApp: '5215512345678',
  locationCity: 'Madrid / CDMX / Online Global',
  currencySymbol: '$',
};

export const INITIAL_SCHEDULE: DaySchedule[] = [
  {
    dayLabel: 'LUN',
    dayNum: 15,
    slots: [
      { time: '09:00', status: 'booked' },
      { time: '11:00', status: 'available' },
      { time: '17:00', status: 'available' },
    ],
  },
  {
    dayLabel: 'MAR',
    dayNum: 16,
    slots: [
      { time: '08:30', status: 'available' },
      { time: '10:00', status: 'booked' },
      { time: '18:00', status: 'available' },
    ],
  },
  {
    dayLabel: 'MIÉ',
    dayNum: 17,
    slots: [
      { time: '09:00', status: 'available' },
      { time: '12:00', status: 'available' },
      { time: '17:30', status: 'booked' },
    ],
  },
  {
    dayLabel: 'JUE',
    dayNum: 18,
    slots: [
      { time: '10:00', status: 'available' },
      { time: '13:00', status: 'booked' },
      { time: '19:00', status: 'available' },
    ],
  },
  {
    dayLabel: 'VIE',
    dayNum: 19,
    slots: [
      { time: '08:30', status: 'available' },
      { time: '11:00', status: 'available' },
      { time: '16:00', status: 'booked' },
    ],
  },
  {
    dayLabel: 'SÁB',
    dayNum: 20,
    slots: [
      { time: '09:00', status: 'available' },
      { time: '10:30', status: 'available' },
    ],
  },
  {
    dayLabel: 'DOM',
    dayNum: 21,
    slots: [
      { time: 'Descanso', status: 'booked' },
    ],
  },
];

export const PLAN_TIERS: PlanTier[] = [
  {
    id: 'esencial',
    name: 'Esencial',
    tagline: 'Rutina individualizada y seguimiento mensual para entrenar por tu cuenta con guía técnica.',
    priceText: 'Consultar tarifa',
    features: [
      'Rutina de entrenamiento 100% personalizada',
      'Actualización mensual del plan según progreso',
      'Acceso al portal privado y catálogo de técnica',
      'Revisión mensual de métricas y composición',
    ],
  },
  {
    id: 'completo',
    name: 'Completo',
    featured: true,
    badge: 'Más elegido',
    tagline: 'Entrenamiento + nutrición adaptativa con seguimiento semanal cercano y soporte continuo.',
    priceText: 'Consultar tarifa',
    features: [
      'Todo lo incluido en el plan Esencial',
      'Plan nutricional flexible según objetivos y preferencias',
      'Revisión semanal de volumen, cargas y sensaciones',
      'Ajustes de rutina en tiempo real desde el portal',
      'Contacto directo prioritario por WhatsApp',
    ],
  },
  {
    id: 'premium',
    name: 'Premium 1:1',
    tagline: 'Acompañamiento integral con sesiones directas (presenciales u online en vivo) y prioridad absoluta.',
    priceText: 'Consultar tarifa',
    features: [
      'Todo lo incluido en el plan Completo',
      'Sesiones 1:1 de entrenamiento en vivo o presencial',
      'Corrección biomecánica en video personalizada',
      'Prioridad de reserva en agenda semanal',
      'Asesoría integral de hábitos, sueño y suplementación',
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Camila R.',
    role: 'Recomposición corporal',
    initials: 'CR',
    since: 'Cliente hace 1 año',
    quote: 'Antes perdía la cuenta de mis pesos y medidas en notas sueltas. Con este sistema veo mi gráfica de progreso real y mi rutina exacta sin perder tiempo.',
    avatarColor: 'from-[#9B5CFF] to-[#2FB6FF]',
  },
  {
    id: '2',
    name: 'Javier M.',
    role: 'Fuerza & Rendimiento',
    initials: 'JM',
    since: 'Cliente hace 2 años',
    quote: 'Poder elegir y confirmar mis sesiones desde la agenda sin tener que esperar a que me respondan qué horas están libres ha cambiado mi semana por completo.',
    avatarColor: 'from-[#2FB6FF] to-[#7A47D6]',
  },
  {
    id: '3',
    name: 'Lucía P.',
    role: 'Salud y Movilidad',
    initials: 'LP',
    since: 'Cliente hace 6 meses',
    quote: 'Se siente como tener un entrenador personal de élite de verdad, no una app automática que nadie revisa. Cada semana hay ajustes basados en mis datos reales.',
    avatarColor: 'from-[#C24CE0] to-[#9B5CFF]',
  },
];

export const VIDEO_SPOTLIGHT_ITEMS: VideoSpotlightItem[] = [
  {
    id: 'correccion',
    tag: 'Grabado para ti',
    title: 'Corrección personalizada',
    description: 'Cuando tu ejecución en un ejercicio necesita un ajuste de rango o ángulo, tu coach graba un vídeo específico para ti con indicaciones puntuales.',
    videoDuration: '0:45 min',
    coachNote: 'Ajuste de profundidad en sentadilla y postura de cadera.',
  },
  {
    id: 'catalogo',
    tag: 'Catálogo de técnica',
    title: 'Biblioteca de movimientos',
    description: 'Demostraciones técnicas grabadas con tempo, respiración y puntos clave para repasar en el gimnasio antes de cada serie efectiva.',
    videoDuration: '1:15 min',
    coachNote: 'Guía paso a paso: Remo con barra con retracción escapular.',
  },
  {
    id: 'educativo',
    tag: 'Cápsulas de aprendizaje',
    title: 'Entiende el porqué',
    description: 'Material explicativo que acompaña tu proceso para que comprendas la sobrecarga progresiva, la recuperación y el balance calórico.',
    videoDuration: '2:30 min',
    coachNote: 'Concepto clave: RIR (Repeticiones en Reserva) y fatiga.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: '¿Cómo se diseña mi plan de entrenamiento?',
    answer: 'Antes de comenzar, realizamos una evaluación inicial donde revisamos tu historial físico, lesiones previas, nivel de experiencia, disponibilidad horaria y equipo disponible (gimnasio completo o en casa). Tu coach crea tu rutina desde cero adaptada a tu anatomía.',
  },
  {
    question: '¿Qué diferencia hay entre este servicio y una app automática?',
    answer: 'Una app genérica entrega plantillas algorítmicas sin supervisión. Aquí tienes a un entrenador profesional real que monitorea tus registros, revisa tus videos de técnica, ajusta las cargas cada semana y responde tus dudas por WhatsApp.',
  },
  {
    question: '¿Cómo funciona la reserva de sesiones en la agenda?',
    answer: 'Tu coach publica sus horarios disponibles cada semana en la plataforma. Solo seleccionas el día, la hora y el tipo de sesión (presencial, online o asesoría), y confirmas al instante con un mensaje pre-cargado por WhatsApp.',
  },
  {
    question: '¿Puedo entrenar si viajo con frecuencia o tengo horarios cambiantes?',
    answer: 'Totalmente. El portal se adapta a cualquier dispositivo móvil. Si viajas, tu coach puede adaptar tu rutina a ejercicios con bandas, peso corporal o gimnasio de hotel en cuestión de minutos.',
  },
  {
    question: '¿Se requiere contrato o permanencia mínima?',
    answer: 'No. El servicio se renueva mensualmente sin cláusulas de permanencia forzosa. Puedes pausar o cancelar cuando lo decidas notificando antes de tu siguiente ciclo.',
  },
];
