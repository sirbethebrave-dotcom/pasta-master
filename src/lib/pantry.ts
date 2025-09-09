'use client';

export type PantryItem = { name: string; qty?: number; unit?: string };
const KEY = 'pm_pantry_v1';

export function loadPantry(): PantryItem[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; }
}

export function savePantry(items: PantryItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function togglePantryItem(name: string) {
  const items = loadPantry();
  const exists = items.find((i) => i.name === name);
  const next = exists ? items.filter((i) => i.name !== name) : [...items, { name }];
  savePantry(next);
  return next;
}
