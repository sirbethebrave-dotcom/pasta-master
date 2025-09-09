import { openai } from './openai';

export async function generateRecipeImage(title: string, description?: string) {
  if (!process.env.OPENAI_API_KEY) {
    // Return placeholder image if no API key
    return 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?q=80&w=1200&auto=format&fit=crop';
  }

  const prompt = `Professional food photography of ${title}. ${description || ''} 
    Beautiful pasta dish on a white plate, top-down view, natural lighting, 
    high quality, appetizing, restaurant style.`;

  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      size: '1024x1024',
      quality: 'standard',
      n: 1,
    });

    return response.data?.[0]?.url || 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?q=80&w=1200&auto=format&fit=crop';
  } catch (error) {
    console.error('Image generation error:', error);
    return 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?q=80&w=1200&auto=format&fit=crop';
  }
}
