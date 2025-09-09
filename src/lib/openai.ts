import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || undefined,
});

export async function generateRecipe(ingredients: string[], constraints: Record<string, unknown>) {
  if (!process.env.OPENAI_API_KEY) {
    // Return mock data if no API key
    return {
      title: 'Паста из того, что есть',
      description: 'Быстрый рецепт из доступных ингредиентов',
      ingredients: ingredients.length ? ingredients : ['паста', 'оливковое масло', 'чеснок', 'сыр'],
      steps: [
        { text: 'Отварите пасту до al dente', timeMin: 10 },
        { text: 'Смешайте с соусом из масла и чеснока', timeMin: 5 },
        { text: 'Подавайте с тертым сыром', timeMin: 1 },
      ],
      nutrition: { cal: 520, protein: 18, fat: 20, carb: 65 },
      timeTotal: 16,
      difficulty: 'легко',
      tags: 'быстро,домашнее',
    };
  }

  const prompt = `Создай рецепт пасты на русском языке. 
Ингредиенты: ${ingredients.join(', ')}
Ограничения: ${JSON.stringify(constraints)}

Ответь в JSON формате:
{
  "title": "название рецепта",
  "description": "краткое описание",
  "ingredients": [{"name": "ингредиент", "amount": 200, "unit": "г"}],
  "steps": [{"text": "шаг приготовления", "timeMin": 5}],
  "nutrition": {"cal": 520, "protein": 18, "fat": 20, "carb": 65},
  "timeTotal": 20,
  "difficulty": "легко/средне/сложно",
  "tags": "тег1,тег2,тег3"
}`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error('No response from OpenAI');

    return JSON.parse(content);
  } catch (error) {
    console.error('OpenAI error:', error);
    // Fallback to mock data
    return {
      title: 'Паста из того, что есть',
      description: 'Быстрый рецепт из доступных ингредиентов',
      ingredients: ingredients.length ? ingredients : ['паста', 'оливковое масло', 'чеснок', 'сыр'],
      steps: [
        { text: 'Отварите пасту до al dente', timeMin: 10 },
        { text: 'Смешайте с соусом из масла и чеснока', timeMin: 5 },
        { text: 'Подавайте с тертым сыром', timeMin: 1 },
      ],
      nutrition: { cal: 520, protein: 18, fat: 20, carb: 65 },
      timeTotal: 16,
      difficulty: 'легко',
      tags: 'быстро,домашнее',
    };
  }
}
