'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { Button } from '@/app/components/Button';
import { InputWhite } from '@/app/components/Input';
import { Trash2 } from 'lucide-react';

function AdminNav() {
  const pathname = usePathname();
  const navItems = [
    { label: 'Добавление товара', href: '/admin' },
    { label: 'Удаление товара', href: '/admin/remove' },
    { label: 'Изменение товара', href: '/admin/edit' },
    { label: 'Заказы', href: '/admin/orders' },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} className="no-underline">
          <Button
            variant={pathname === item.href ? 'dark' : 'outline'}
            size="md"
          >
            {item.label}
          </Button>
        </Link>
      ))}
    </div>
  );
}

export default function AdminRemovePage() {
  const [productId, setProductId] = useState('');
  const [removed, setRemoved] = useState(false);

  const handleRemove = (e: React.FormEvent) => {
    e.preventDefault();
    setRemoved(true);
    setTimeout(() => {
      setRemoved(false);
      setProductId('');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-white font-[Inter,sans-serif]">
      <Header isLoggedIn={true} />

      <main className="px-4 sm:px-6 xl:px-[60px] max-w-[1440px] mx-auto py-8 sm:py-10">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-10 items-start">
          {/* Form panel */}
          <div className="w-full lg:w-[48%] xl:w-[600px] shrink-0">
            <div className="bg-[#F5F5F5] rounded-[32px] p-8 flex flex-col gap-8">
              <h1 className="text-[#1F2128] text-[36px] sm:text-[48px] font-medium leading-[1.08]">
                Удалить товар
              </h1>

              <form onSubmit={handleRemove} className="flex flex-col gap-8">
                <InputWhite
                  type="text"
                  placeholder="ID товара"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  required
                />

                <div className="flex gap-5">
                  <Button
                    variant="danger"
                    size="md"
                    type="submit"
                    icon={<Trash2 size={18} />}
                    className="flex-1 justify-center"
                  >
                    {removed ? 'Удалено!' : 'Удалить'}
                  </Button>
                  <div className="flex-1" />
                </div>
              </form>
            </div>
          </div>

          {/* Admin nav */}
          <div className="flex-1">
            <AdminNav />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
