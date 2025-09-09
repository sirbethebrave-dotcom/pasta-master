'use client';
// import { useSession, signIn, signOut } from 'next-auth/react';

export function AuthButton() {
  // const { data: session, status } = useSession();
  const session = null;
  const status = "unauthenticated";

  if (status === 'loading') {
    return <div className="w-20 h-8 bg-gray-200 rounded animate-pulse" />;
  }

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">{session.user?.name}</span>
        <button
          onClick={() => () => alert("Авторизация пока не настроена")}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Выйти
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => () => alert("Авторизация пока не настроена")}
      className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
    >
      Войти
    </button>
  );
}
