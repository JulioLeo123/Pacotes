import { packages } from './packages.js';

const EXCLUDE_IDS = new Set(['home', 'login', 'cadastro', 'payment', 'finalizacao-compra']);

export const packagesVisible = packages.filter((p) => !EXCLUDE_IDS.has(String(p.id || '').toLowerCase()));

export function getPackagesSortedByPriceAsc() {
  return [...packagesVisible].sort((a, b) => (a.price || 0) - (b.price || 0));
}
