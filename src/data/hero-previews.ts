import type { Project } from './projects';

const screenProjects = new Set(['chem-is-try', 'pink-cosmetics', 'nandos', 'mi-creations', 'i-touch', 'zyndigo', 'think-different', 'hireme']);
const academicImages: Record<string, string> = {
  TrekTempo: 'images/screens/trektempo-overview.webp',
  'RF Stores': 'images/screens/rf-stores-overview.webp',
  Busify: 'images/screens/busify-overview.webp',
  'Foodie-Fix': 'images/screens/foodie-fix-overview.webp',
};

export function heroPreview(project: Project) {
  const base = import.meta.env.BASE_URL;
  const screens = !!project.id && screenProjects.has(project.id);
  return {
    desktop: base + (screens ? `images/screens/${project.id}-desktop.webp` : academicImages[project.title] || project.image),
    mobile: screens ? `${base}images/screens/${project.id}-mobile.webp` : undefined,
    overview: !screens,
    label: screens ? (project.tags.some(tag => tag.startsWith('Flutter')) ? 'WEB + MOBILE APPLICATION' : 'RESPONSIVE WEB EXPERIENCE') : 'PROJECT OVERVIEW',
  };
}
