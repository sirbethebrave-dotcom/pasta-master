import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || undefined,
});

export async function generateRecipe(ingredients: string[], constraints: Record<string, unknown>) {
  if (!process.env.OPENAI_API_KEY) {
    // Generate smart mock data based on ingredients
    const pasta = (constraints.pasta as string) || 'паста';
    const hasTomatoes = ingredients.some(i => i.toLowerCase().includes('помидор'));
    const hasCream = ingredients.some(i => i.toLowerCase().includes('сливк'));
    const hasSeafood = ingredients.some(i => ['креветки', 'лосось', 'анчоусы'].some(s => i.toLowerCase().includes(s)));
    const hasMushrooms = ingredients.some(i => i.toLowerCase().includes('гриб'));
    const hasBacon = ingredients.some(i => i.toLowerCase().includes('бекон'));
    const hasCheese = ingredients.some(i => i.toLowerCase().includes('сыр'));
    const hasGarlic = ingredients.some(i => i.toLowerCase().includes('чеснок'));
    const hasOnion = ingredients.some(i => i.toLowerCase().includes('лук'));
    const hasBasil = ingredients.some(i => i.toLowerCase().includes('базилик'));

    // Generate title based on ingredients
    let title = `${pasta}`;
    if (hasTomatoes && hasBasil) title = `${pasta} с томатами и базиликом`;
    else if (hasCream) title = `${pasta} в сливочном соусе`;
    else if (hasSeafood) title = `${pasta} с морепродуктами`;
    else if (hasMushrooms) title = `${pasta} с грибами`;
    else if (hasBacon) title = `${pasta} с беконом`;
    else if (hasTomatoes) title = `${pasta} с томатами`;

    // Generate description
    let description = 'Вкусный рецепт из доступных ингредиентов';
    if (hasSeafood) description = 'Изысканная паста с морепродуктами';
    else if (hasCream) description = 'Нежная паста в сливочном соусе';
    else if (hasTomatoes) description = 'Классическая паста с томатами';

    // Generate steps based on ingredients
    const getSteps = () => {
      const baseStep = { text: `Отварите ${pasta.toLowerCase()} до al dente`, timeMin: 10 };
      
      if (hasTomatoes && hasGarlic && hasOnion) {
        return [
          baseStep,
          { text: 'Нарежьте помидоры кубиками, мелко порубите чеснок и лук', timeMin: 5 },
          { text: 'Обжарьте лук и чеснок на оливковом масле до золотистого цвета', timeMin: 3 },
          { text: 'Добавьте помидоры и тушите 5-7 минут', timeMin: 7 },
          { text: `Смешайте соус с ${pasta.toLowerCase()}`, timeMin: 2 },
          ...(hasCheese ? [{ text: 'Подавайте с тертым сыром', timeMin: 1 }] : [])
        ];
      } else if (hasCream && hasGarlic) {
        return [
          baseStep,
          { text: 'Мелко порубите чеснок', timeMin: 2 },
          { text: 'Обжарьте чеснок на сливочном масле 1-2 минуты', timeMin: 2 },
          { text: 'Добавьте сливки и доведите до кипения', timeMin: 3 },
          { text: `Смешайте соус с ${pasta.toLowerCase()}`, timeMin: 2 },
          ...(hasCheese ? [{ text: 'Подавайте с тертым сыром', timeMin: 1 }] : [])
        ];
      } else if (hasSeafood) {
        return [
          baseStep,
          { text: 'Очистите и подготовьте морепродукты', timeMin: 5 },
          { text: 'Обжарьте морепродукты на оливковом масле 3-4 минуты', timeMin: 4 },
          { text: 'Добавьте чеснок и белое вино, тушите 2 минуты', timeMin: 2 },
          { text: `Смешайте с ${pasta.toLowerCase()}`, timeMin: 2 },
          ...(hasCheese ? [{ text: 'Подавайте с тертым сыром', timeMin: 1 }] : [])
        ];
      } else if (hasMushrooms) {
        return [
          baseStep,
          { text: 'Нарежьте грибы ломтиками', timeMin: 3 },
          { text: 'Обжарьте грибы на оливковом масле до золотистого цвета', timeMin: 5 },
          { text: 'Добавьте чеснок и зелень', timeMin: 1 },
          { text: `Смешайте с ${pasta.toLowerCase()}`, timeMin: 2 },
          ...(hasCheese ? [{ text: 'Подавайте с тертым сыром', timeMin: 1 }] : [])
        ];
      } else {
        return [
          baseStep,
          { text: 'Разогрейте оливковое масло на сковороде', timeMin: 1 },
          { text: 'Обжарьте чеснок 1-2 минуты', timeMin: 2 },
          { text: `Смешайте с ${pasta.toLowerCase()}`, timeMin: 2 },
          ...(hasCheese ? [{ text: 'Подавайте с тертым сыром', timeMin: 1 }] : [])
        ];
      }
    };

    const steps = getSteps();

    const timeTotal = steps.reduce((total, step) => total + step.timeMin, 0);

    return {
      title,
      description,
      ingredients: ingredients.length ? ingredients : ['паста', 'оливковое масло', 'чеснок', 'сыр'],
      steps,
      nutrition: { cal: 520, protein: 18, fat: 20, carb: 65 },
      timeTotal,
      difficulty: timeTotal > 20 ? 'средне' : 'легко',
      tags: hasSeafood ? 'морепродукты,изысканное' : hasCream ? 'сливочное,нежное' : 'быстро,домашнее',
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
