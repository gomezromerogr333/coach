export interface CoachConfig {
  coachName: string;
  brandName: string;
  brandDomain: string;
  coachTitle: string;
  coachSpecialty: string;
  experienceYears: number;
  activeClientsCount: number;
  consistencyPercentage: number;
  phoneWhatsApp: string;
  locationCity: string;
  currencySymbol: string;
}

export interface DaySchedule {
  dayLabel: string; // e.g. "LUN", "MAR"
  dayNum: number;   // e.g. 15
  slots: {
    time: string;
    status: 'available' | 'booked';
  }[];
}

export type SessionType = 'Presencial' | 'Online' | 'Nutrición';

export interface PlanTier {
  id: string;
  name: string;
  tagline: string;
  priceText: string;
  featured?: boolean;
  badge?: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  initials: string;
  since: string;
  quote: string;
  avatarColor: string;
}

export interface VideoSpotlightItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  videoDuration: string;
  coachNote: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
