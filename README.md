# Pasta Master — Конструктор пасты на ИИ

<!-- Build trigger: force Vercel to use latest commit -->

## 🚀 Запуск
```bash
npm install
npm run dev
```
Открой `http://localhost:3000`.

## ✨ Что готово
- **Landing**: хиро, конструктор чипсов, библиотека карточек
- **Рецепт**: `/recipe/[id]` с ингредиентами и шагами  
- **AI генерация**: `POST /api/generate` (OpenAI GPT-4o-mini)
- **Картинки**: `POST /api/generate-image` (DALL-E 3)
- **Кладовая**: localStorage, чипсы на главной
- **База данных**: SQLite + Prisma (User, Recipe, Rating, PantryItem)
- **Авторизация**: NextAuth (Google OAuth готов к настройке)

## 🔧 Переменные окружения
Скопируй `.env.example` → `.env.local`:

```bash
# Database
DATABASE_URL="file:./dev.db"

# NextAuth  
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-in-production"

# OpenAI (для реальной генерации)
OPENAI_API_KEY="sk-..."

# Google OAuth (опционально)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

## 🎯 Функционал
- **Конструктор**: выбери пасту + ингредиенты → ИИ создаст рецепт
- **Кладовая**: отметь что есть дома → рецепты только из доступного
- **Библиотека**: фильтры по тегам, рейтинги, карточки
- **Генерация**: без API ключа = мок данные, с ключом = реальный ИИ
- **Сохранения**: авторизованные пользователи сохраняют рецепты

## 📁 Структура
```
src/
├── app/                    # App Router
│   ├── page.tsx           # Главная
│   ├── recipe/[id]/       # Страница рецепта
│   └── api/               # API endpoints
├── components/            # UI компоненты
├── lib/                   # Утилиты (db, openai, images)
├── data/                  # Мок данные
└── types/                 # TypeScript типы
```

## 🔄 Следующие шаги
- Настроить Google OAuth
- Добавить реальные картинки блюд
- Расширить фильтры библиотеки
- Добавить рейтинги и комментарии
- Мобильная версия
