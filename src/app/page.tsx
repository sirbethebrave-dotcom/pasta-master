'use client';
import { useState } from 'react';
import { AuthButton } from '@/components/AuthButton';
import { Pantry } from '@/components/Pantry';
import { GenerateButton } from '@/components/GenerateButton';
import type { ConstructorState } from '@/types/constructor';

const PASTA_TYPES = [
  'Спагетти',
  'Пенне',
  'Фузилли',
  'Ригатони',
  'Лингвини',
  'Феттучини',
  'Равиоли',
  'Тортеллини'
];

const INGREDIENTS = [
  'Помидоры',
  'Чеснок',
  'Лук',
  'Базилик',
  'Орегано',
  'Сыр пармезан',
  'Моцарелла',
  'Оливковое масло',
  'Сливки',
  'Грибы',
  'Бекон',
  'Креветки',
  'Лосось',
  'Брокколи',
  'Шпинат',
  'Каперсы',
  'Оливки',
  'Анчоусы'
];

export default function Home() {
  const [state, setState] = useState<ConstructorState>({
    query: '',
    pasta: null,
    ingredients: []
  });

  const handlePastaSelect = (pasta: string) => {
    setState(prev => ({ ...prev, pasta }));
  };

  const handleIngredientToggle = (ingredient: string) => {
    setState(prev => ({
      ...prev,
      ingredients: prev.ingredients.includes(ingredient)
        ? prev.ingredients.filter(i => i !== ingredient)
        : [...prev.ingredients, ingredient]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-green-800">🍝 Pasta Master</h1>
            </div>
            <AuthButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Гениальный конструктор пасты на ИИ
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Выберите пасту и ингредиенты, а ИИ создаст идеальный рецепт
          </p>
        </div>
      </section>

      {/* Constructor */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Query Input */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Дополнительные пожелания (опционально)
              </label>
              <input
                type="text"
                value={state.query}
                onChange={(e) => setState(prev => ({ ...prev, query: e.target.value }))}
                placeholder="Например: острое, вегетарианское, с морепродуктами..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Pasta Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Выберите тип пасты
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PASTA_TYPES.map((pasta) => (
                  <button
                    key={pasta}
                    onClick={() => handlePastaSelect(pasta)}
                    className={`px-4 py-3 rounded-lg border-2 transition-colors ${
                      state.pasta === pasta
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    {pasta}
                  </button>
                ))}
              </div>
            </div>

            {/* Ingredients Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Выберите ингредиенты
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {INGREDIENTS.map((ingredient) => (
                  <button
                    key={ingredient}
                    onClick={() => handleIngredientToggle(ingredient)}
                    className={`px-4 py-3 rounded-lg border-2 transition-colors ${
                      state.ingredients.includes(ingredient)
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    {ingredient}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Ingredients Summary */}
            {state.ingredients.length > 0 && (
              <div className="mb-8 p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-800 mb-2">Выбранные ингредиенты:</h3>
                <div className="flex flex-wrap gap-2">
                  {state.ingredients.map((ingredient) => (
                    <span
                      key={ingredient}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Generate Button */}
            <GenerateButton state={state} />
          </div>
        </div>
      </section>

      {/* Pantry Section */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Pantry />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>© 2024 Pasta Master. Создано с помощью ИИ.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}