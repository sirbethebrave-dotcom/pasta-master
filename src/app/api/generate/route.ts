import { NextResponse } from 'next/server';
import { generateRecipe } from '@/lib/openai';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { ingredients = [], constraints = {}, userId } = body;

    // Generate recipe with AI
    const generatedRecipe = await generateRecipe(ingredients, constraints);

    // Save to database if user is authenticated
    let savedRecipe = null;
    if (userId) {
      savedRecipe = await prisma.recipe.create({
        data: {
          title: generatedRecipe.title,
          description: generatedRecipe.description,
          ingredients: generatedRecipe.ingredients,
          steps: generatedRecipe.steps,
          nutrition: generatedRecipe.nutrition,
          timeTotal: generatedRecipe.timeTotal,
          difficulty: generatedRecipe.difficulty,
          tags: generatedRecipe.tags,
          isGenerated: true,
          authorId: userId,
        },
      });
    }

    return NextResponse.json({ 
      recipe: savedRecipe || generatedRecipe,
      isSaved: !!savedRecipe 
    });
  } catch (error) {
    console.error('Generate error:', error);
    return NextResponse.json({ error: 'Failed to generate recipe' }, { status: 500 });
  }
}
