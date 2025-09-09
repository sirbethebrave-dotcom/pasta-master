import { NextResponse } from 'next/server';
import { generateRecipeImage } from '@/lib/images';

export async function POST(req: Request) {
  try {
    const { title, description } = await req.json();
    
    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const imageUrl = await generateRecipeImage(title, description);
    
    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error('Image generation error:', error);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}
