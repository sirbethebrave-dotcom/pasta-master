'use client';
import React from 'react';
import { INGREDIENT_TAGS } from '@/data/recipes';
import { loadPantry, togglePantryItem } from '@/lib/pantry';

export function Pantry() {
  const [items, setItems] = React.useState<string[]>([]);

  React.useEffect(() => {
    setItems(loadPantry().map((i) => i.name));
  }, []);

  const toggle = (name: string) => {
    const next = togglePantryItem(name).map((i) => i.name);
    setItems(next);
  };

  return (
    <section className="mt-10 rounded-2xl bg-white p-4 shadow">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Кладовая</h3>
        <p className="text-xs text-gray-500">отметь, что есть дома</p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {INGREDIENT_TAGS.map((t) => (
          <button
            key={t}
            onClick={() => toggle(t)}
            className={`px-3 py-1 rounded-full text-sm border ${
              items.includes(t) ? 'bg-black text-white border-black' : 'bg-white border-gray-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </section>
  );
}
