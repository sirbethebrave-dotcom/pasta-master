import Image from 'next/image';
import { MOCK_RECIPES } from '@/data/recipes';

type Props = { params: { id: string } };

export default function RecipePage({ params }: Props) {
  const recipe = MOCK_RECIPES.find((r) => r.id === params.id) ?? MOCK_RECIPES[0];

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow">
        <Image src={recipe.imageUrl} alt={recipe.title} fill className="object-cover" />
      </div>
      <h1 className="mt-6 text-3xl font-bold">{recipe.title}</h1>

      <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white p-4 shadow">
          <h2 className="font-semibold mb-3">Ингредиенты</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {recipe.ingredients.map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow">
          <h2 className="font-semibold mb-3">Шаги</h2>
          <ol className="list-decimal pl-5 space-y-2 text-sm">
            {['Отварите пасту до al dente','Разогрейте масло, обжарьте чеснок','Смешайте пасту с соусом','Подайте с сыром'].map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
