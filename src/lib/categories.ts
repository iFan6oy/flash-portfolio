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
  | 'trading'
  | 'web'
  | 'games';

export const CATEGORY: Record<Category, { label: string; accent: string; rgb: string }> = {
  systems: { label: 'Systems design', accent: '#68c7e8', rgb: '104 199 232' },
  ai: { label: 'AI products', accent: '#68c7e8', rgb: '104 199 232' },
  api: { label: 'APIs & data products', accent: '#68c7e8', rgb: '104 199 232' },
  media: { label: 'Cross-device product', accent: '#68c7e8', rgb: '104 199 232' },
  tv: { label: 'TV & native apps', accent: '#68c7e8', rgb: '104 199 232' },
  mobile: { label: 'Mobile apps', accent: '#68c7e8', rgb: '104 199 232' },
  data: { label: 'Data products', accent: '#68c7e8', rgb: '104 199 232' },
  automation: { label: 'Automation', accent: '#68c7e8', rgb: '104 199 232' },
  power: { label: 'Business applications', accent: '#68c7e8', rgb: '104 199 232' },
  trading: { label: 'Autonomous systems', accent: '#68c7e8', rgb: '104 199 232' },
  web: { label: 'Web product', accent: '#68c7e8', rgb: '104 199 232' },
  games: { label: 'Games', accent: '#68c7e8', rgb: '104 199 232' },
};
