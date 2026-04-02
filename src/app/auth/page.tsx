'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { Button } from '@/app/components/Button';
import { InputGray } from '@/app/components/Input';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nextTab = params.get('tab') === 'register' ? 'register' : 'login';
    setActiveTab(nextTab);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-white font-[Inter,sans-serif] flex flex-col">
      <Header isLoggedIn={false} />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10 sm:py-16">
        <div className="w-full max-w-[360px] sm:max-w-[400px] flex flex-col gap-8 sm:gap-10">
          {/* Tab switcher */}
          <div className="flex items-center gap-2 justify-center">
            <Button
              variant={activeTab === 'login' ? 'dark' : 'outline'}
              size="md"
              onClick={() => setActiveTab('login')}
            >
              Вход
            </Button>
            <Button
              variant={activeTab === 'register' ? 'dark' : 'outline'}
              size="md"
              onClick={() => setActiveTab('register')}
            >
              Регистрация
            </Button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {activeTab === 'register' && (
              <InputGray
                type="text"
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}
            <InputGray
              type="text"
              placeholder="Логин"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
            <InputGray
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button variant="dark" size="md" fullWidth className="mt-2" type="submit">
              {activeTab === 'login' ? 'Войти' : 'Зарегистрироваться'}
            </Button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
