/**
 * Semantic project categories. These labels help describe the work, but they no
 * longer drive a rainbow visual system. The portfolio has one restrained brand
 * accent and lets real product screenshots provide project-specific color.
 */
export type Category =
  | 'systems'
  | 'ai'
  | 'api'
  | 'media'
  | 'tv'
  | 'mobile'
  | 'data'
  | 'automation'
  | 'power'
  | 'trading';

export const CATEGORY: Record<Category, { label: string; accent: string; rgb: string }> = {
  systems: { label: 'Distributed systems', accent: '#68c7e8', rgb: '104 199 232' },
  ai: { label: 'AI & agents', accent: '#68c7e8', rgb: '104 199 232' },
  api: { label: 'APIs & data products', accent: '#68c7e8', rgb: '104 199 232' },
  media: { label: 'Media infrastructure', accent: '#68c7e8', rgb: '104 199 232' },
  tv: { label: 'TV & native clients', accent: '#68c7e8', rgb: '104 199 232' },
  mobile: { label: 'Mobile', accent: '#68c7e8', rgb: '104 199 232' },
  data: { label: 'Data systems', accent: '#68c7e8', rgb: '104 199 232' },
  automation: { label: 'Automation', accent: '#68c7e8', rgb: '104 199 232' },
  power: { label: 'Power Platform', accent: '#68c7e8', rgb: '104 199 232' },
  trading: { label: 'Autonomous systems', accent: '#68c7e8', rgb: '104 199 232' },
};
