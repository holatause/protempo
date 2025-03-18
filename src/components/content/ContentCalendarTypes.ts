// Tipos para el Calendario de Contenido
export interface ContentItem {
  id: string;
  title: string;
  description: string;
  platform: string;
  contentType: 'post' | 'video' | 'story' | 'reel' | 'blog' | 'email' | 'ad';
  status: 'draft' | 'scheduled' | 'published' | 'archived';
  scheduledDate: string;
  publishedDate?: string;
  author: string;
  campaign?: string;
  tags: string[];
  assets?: string[];
  engagement?: {
    likes?: number;
    comments?: number;
    shares?: number;
    clicks?: number;
    impressions?: number;
  };
  region: string;
}

export interface CalendarDay {
  date: Date;
  items: ContentItem[];
  isCurrentMonth: boolean;
  isToday: boolean;
}

export interface CalendarWeek {
  days: CalendarDay[];
}

export interface CalendarMonth {
  month: number;
  year: number;
  weeks: CalendarWeek[];
}

// Datos de ejemplo para el MVP
export const sampleContentItems: ContentItem[] = [
  {
    id: "content-001",
    title: "Lanzamiento Nueva Colección",
    description: "Post anunciando el lanzamiento de la nueva colección de verano con fotos de productos destacados.",
    platform: "Instagram",
    contentType: "post",
    status: "scheduled",
    scheduledDate: "2024-06-01T10:00:00",
    author: "Marketing Team",
    campaign: "Lanzamiento Colección Verano",
    tags: ["verano", "moda", "lanzamiento"],
    assets: ["imagen1.jpg", "imagen2.jpg"],
    region: "BOG"
  },
  {
    id: "content-002",
    title: "Tutorial de Uso del Producto",
    description: "Video mostrando cómo utilizar el producto principal de la colección con tips y consejos.",
    platform: "YouTube",
    contentType: "video",
    status: "draft",
    scheduledDate: "2024-06-05T15:00:00",
    author: "Content Creator",
    campaign: "Lanzamiento Colección Verano",
    tags: ["tutorial", "howto", "producto"],
    assets: ["video1.mp4"],
    region: "NAC"
  },
  {
    id: "content-003",
    title: "Promoción Día sin IVA",
    description: "Anuncio de descuentos especiales para el día sin IVA con códigos promocionales exclusivos.",
    platform: "Facebook",
    contentType: "post",
    status: "scheduled",
    scheduledDate: "2024-06-28T09:00:00",
    author: "Marketing Team",
    campaign: "Promoción Día sin IVA",
    tags: ["promoción", "descuento", "díasiniVA"],
    assets: ["banner1.jpg"],
    region: "NAC"
  },
  {
    id: "content-004",
    title: "Email Recordatorio Día sin IVA",
    description: "Email recordando a los clientes sobre las promociones del día sin IVA y productos destacados.",
    platform: "Email",
    contentType: "email",
    status: "scheduled",
    scheduledDate: "2024-06-27T08:00:00",
    author: "Email Marketing",
    campaign: "Promoción Día sin IVA",
    tags: ["email", "promoción", "recordatorio"],
    assets: ["email_template.html"],
    region: "NAC"
  },
  {
    id: "content-005",
    title: "Historia Detrás de la Marca",
    description: "Blog post contando la historia de la marca, valores y visión para conectar con la audiencia.",
    platform: "Blog",
    contentType: "blog",
    status: "published",
    scheduledDate: "2024-05-15T12:00:00",
    publishedDate: "2024-05-15T12:00:00",
    author: "Content Writer",
    tags: ["marca", "historia", "valores"],
    assets: ["blog_cover.jpg"],
    engagement: {
      likes: 45,
      comments: 12,
      shares: 8,
      clicks: 320,
      impressions: 1200
    },
    region: "BOG"
  },
  {
    id: "content-006",
    title: "Tendencias de Moda 2024",
    description: "Reel mostrando las principales tendencias de moda para 2024 con productos de la marca.",
    platform: "Instagram",
    contentType: "reel",
    status: "scheduled",
    scheduledDate: "2024-06-10T18:00:00",
    author: "Social Media Manager",
    tags: ["tendencias", "moda", "2024", "reel"],
    assets: ["reel.mp4"],
    region: "MED"
  },
  {
    id: "content-007",
    title: "Testimonios de Clientes",
    description: "Carrusel con testimonios de clientes satisfechos mostrando productos en uso.",
    platform: "Instagram",
    contentType: "post",
    status: "scheduled",
    scheduledDate: "2024-06-15T14:00:00",
    author: "Marketing Team",
    campaign: "Lanzamiento Colección Verano",
    tags: ["testimonios", "clientes", "satisfacción"],
    assets: ["testimonio1.jpg", "testimonio2.jpg", "testimonio3.jpg"],
    region: "BOG"
  },
  {
    id: "content-008",
    title: "Anuncio Webinar Tendencias",
    description: "Anuncio del próximo webinar sobre tendencias del mercado para el segundo semestre.",
    platform: "LinkedIn",
    contentType: "post",
    status: "scheduled",
    scheduledDate: "2024-07-01T11:00:00",
    author: "B2B Marketing",
    campaign: "Webinar Tendencias 2024",
    tags: ["webinar", "tendencias", "mercado", "B2B"],
    assets: ["webinar_banner.jpg"],
    region: "BOG"
  },
  {
    id: "content-009",
    title: "Campaña Google Ads - Día sin IVA",
    description: "Conjunto de anuncios para Google Ads promocionando productos para el día sin IVA.",
    platform: "Google Ads",
    contentType: "ad",
    status: "scheduled",
    scheduledDate: "2024-06-25T00:00:00",
    author: "SEM Specialist",
    campaign: "Promoción Día sin IVA",
    tags: ["SEM", "GoogleAds", "promoción"],
    assets: ["ad1.jpg", "ad2.jpg", "ad3.jpg"],
    region: "NAC"
  },
  {
    id: "content-010",
    title: "Recordatorio Webinar",
    description: "Email recordatorio para los inscritos al webinar con link de acceso y agenda.",
    platform: "Email",
    contentType: "email",
    status: "scheduled",
    scheduledDate: "2024-07-14T09:00:00",
    author: "Email Marketing",
    campaign: "Webinar Tendencias 2024",
    tags: ["webinar", "recordatorio", "email"],
    assets: ["email_webinar.html"],
    region: "NAC"
  }
];
