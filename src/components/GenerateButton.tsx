'use client';
import React, { useState } from 'react';
// import { useSession } from 'next-auth/react';
import type { ConstructorState } from '@/types/constructor';

export function GenerateButton({ state }: { state: ConstructorState }) {
  // const { data: session } = useSession();
  // const session = null;
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<{
    id?: string; 
    title: string;
    description?: string;
    ingredients?: string[];
    steps?: (string | { text: string; timeMin: number })[];
    timeTotal?: number;
    difficulty?: string;
  } | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ingredients: state.ingredients,
          constraints: { pasta: state.pasta, query: state.query },
          userId: undefined, // Пока авторизация не настроена - исправлено v4
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
        <div className="mt-6 p-6 bg-green-50 rounded-xl border border-green-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🎉</span>
            <h3 className="text-xl font-bold text-green-800">Рецепт создан!</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">{generatedRecipe.title}</h4>
              {generatedRecipe.description && (
                <p className="text-gray-600 mb-3">{generatedRecipe.description}</p>
              )}
            </div>

            {(generatedRecipe.timeTotal || generatedRecipe.difficulty) && (
              <div className="flex gap-4 text-sm">
                {generatedRecipe.timeTotal && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                    ⏱️ {generatedRecipe.timeTotal} мин
                  </span>
                )}
                {generatedRecipe.difficulty && (
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full">
                    📊 {generatedRecipe.difficulty}
                  </span>
                )}
              </div>
            )}

            {generatedRecipe.ingredients && generatedRecipe.ingredients.length > 0 && (
              <div>
                <h5 className="font-semibold text-gray-700 mb-2">Ингредиенты:</h5>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  {generatedRecipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            )}

            {generatedRecipe.steps && generatedRecipe.steps.length > 0 && (
              <div>
                <h5 className="font-semibold text-gray-700 mb-2">Приготовление:</h5>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                  {generatedRecipe.steps.map((step, index) => (
                    <li key={index}>
                      {typeof step === 'string' ? step : step.text}
                      {typeof step === 'object' && step.timeMin && (
                        <span className="text-blue-600 ml-2">({step.timeMin} мин)</span>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          <button
            onClick={() => setGeneratedRecipe(null)}
            className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Создать новый рецепт
          </button>
        </div>
      )}
    </div>
  );
}
