
export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  whoItsFor: string;
  keyBenefits: string[];
  icon: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: string;
  description: string;
}

export interface Value {
  title: string;
  description: string;
  icon: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface Visit {
  id: string;
  timestamp: string;
  userAgent: string;
}

export interface SiteContent {
  mission: string;
  vision: string;
  story: string;
  images: {
    hero: string;
    about: string;
    logo: string;
    sectionBg: string;
  };
  services: Service[];
  gallery: GalleryItem[];
}
