export type Recipe = {
  id: string;
  title: string;
  rating: number;
  reviews: number;
  timeMin: number;
  calories: number;
  imageUrl: string;
  tags: string[];
  ingredients: string[];
};

export const MOCK_RECIPES: Recipe[] = Array.from({ length: 8 }).map((_, i) => ({
  id: `r${i + 1}`,
  title: [
    'Фарфалле с икрой трески',
    'Спагетти с чесноком и оливковым маслом',
    'Пене с томатным соусом и базиликом',
    'Тортильоне с брокколи и пармезаном',
    'Лазанья с мясным фаршем и сыром',
    'Ригатони с курицей и грибами',
    'Паппарделле с говядиной и розмарином',
    'Фузилли с лососем и лимоном',
  ][i % 8],
  rating: 4.8,
  reviews: 2568,
  timeMin: 20 + (i % 3) * 10,
  calories: 520 + (i % 4) * 30,
  imageUrl: 'https://images.unsplash.com/photo-1523986371872-9d3ba2e2b1a9?q=80&w=1200&auto=format&fit=crop',
  tags: ['топ', 'быстро', 'домашнее'].slice(0, 1 + (i % 3)),
  ingredients: ['паста', 'оливковое масло', 'чеснок', 'сыр пармезан'],
}));

export const PASTA_TYPES = ['спагетти','фарфалле','паппарделле','вермишель','пене','ригатони','фузилли'];
export const INGREDIENT_TAGS = ['курица','индейка','говядина','рыба','сосиски','яйца','помидоры','сливки','грибы','чеснок','лук','капуста'];
