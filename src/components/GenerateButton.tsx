'use client';
import React, { useState } from 'react';
// import { useSession } from 'next-auth/react';
import type { ConstructorState } from '@/types/constructor';

export function GenerateButton({ state }: { state: ConstructorState }) {
  // const { data: session } = useSession();
  // const session = null;
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
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
      
      // Show celebration effect
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
      
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
    <div className="mt-6 relative">
      {/* Celebration Effect */}
      {showCelebration && (
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
            <div className="text-4xl animate-bounce">🎉</div>
          </div>
          <div className="absolute top-0 left-1/4 transform -translate-y-2">
            <div className="text-2xl animate-pulse">✨</div>
          </div>
          <div className="absolute top-0 right-1/4 transform -translate-y-2">
            <div className="text-2xl animate-pulse">🌟</div>
          </div>
        </div>
      )}
      
      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 transform ${
          isGenerating 
            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white animate-pulse' 
            : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:scale-105 hover:shadow-lg'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isGenerating ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Генерируем рецепт...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <span className="text-xl">🍝</span>
            Создать рецепт
            <span className="text-xl">✨</span>
          </span>
        )}
      </button>
      
      {generatedRecipe && (
        <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border-2 border-green-200 shadow-lg animate-fadeIn">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl animate-bounce">🎉</span>
            <h3 className="text-xl font-bold text-green-800">Рецепт создан!</h3>
            <span className="text-2xl animate-pulse">✨</span>
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
