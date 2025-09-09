'use client';
// import { useSession, signIn, signOut } from 'next-auth/react';

export function AuthButton() {
  // const { data: session, status } = useSession();
  // const session = null; // Исправлено v2

  // Пока авторизация не настроена, всегда показываем кнопку входа
  // if (session) {
  //   return (
  //     <div className="flex items-center gap-3">
  //       <span className="text-sm text-gray-600">{session.user?.name}</span>
  //       <button
  //         onClick={() => () => alert("Авторизация пока не настроена")}
  //         className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
  //       >
  //         Выйти
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <button
      onClick={() => () => alert("Авторизация пока не настроена")}
      className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
    >
      Войти
    </button>
  );
}
