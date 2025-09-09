'use client';
import React, { useState } from 'react';
// import { useSession } from 'next-auth/react';
import type { ConstructorState } from '@/types/constructor';

export function GenerateButton({ state }: { state: ConstructorState }) {
  // const { data: session } = useSession();
  // const session = null;
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<{id?: string; title: string} | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ingredients: state.ingredients,
          constraints: { pasta: state.pasta, query: state.query },
          userId: undefined, // Пока авторизация не настроена - исправлено
        }),
      });

      const data = await response.json();
      setGeneratedRecipe(data.recipe);
      
      // Redirect to recipe page or show modal
      if (data.recipe.id) {
        window.location.href = `/recipe/${data.recipe.id}`;
      }
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="mt-6">
      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full py-4 bg-[#8FB07C] text-white rounded-xl font-semibold hover:bg-[#7a9a6b] transition disabled:opacity-50"
      >
        {isGenerating ? 'Генерируем рецепт...' : 'Создать рецепт'}
      </button>
      
      {generatedRecipe && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-green-800">Рецепт создан!</h3>
          <p className="text-green-600">{generatedRecipe.title}</p>
        </div>
      )}
    </div>
  );
}
