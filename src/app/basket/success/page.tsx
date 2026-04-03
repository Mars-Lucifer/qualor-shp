'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { Button } from '@/app/components/Button';

const ORDER_DETAILS = {
  fullName: 'Иванов Иван Иванович',
  phone: '8 (800) 555-35-35',
  email: 'hihi@haha.com',
  address: 'Город Тоски, улица грусти, переулок отчаяния, дом 13',
  total: '2400 $',
  items: ['Microsoft Surface Pro', 'Google Pixel Slate'],
};

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 text-base font-medium">
      <span className="text-q-muted shrink-0">{label}</span>
      <span className="text-q-dark text-right">{value}</span>
    </div>
  );
}

export default function BasketEndPage() {
  return (
    <div className="min-h-screen bg-white font-[Inter,sans-serif] flex flex-col">
      <Header isLoggedIn={true} />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10 sm:py-16">
        <div className="w-full max-w-[650px]">
          <div className="bg-q-surface rounded-q-panel p-8 sm:p-10 flex flex-col gap-8 sm:gap-10 items-center">
            <h1 className="text-q-dark text-[36px] sm:text-[48px] font-medium leading-[1.08] self-start">
              🎉 Успешно!
            </h1>

            {/* Order details */}
            <div className="w-full rounded-q-card border border-q-border p-5 flex flex-col gap-5">
              <DetailRow label="ФИО получателя" value={ORDER_DETAILS.fullName} />
              <DetailRow label="Номер телефона" value={ORDER_DETAILS.phone} />
              <DetailRow label="Эл. почта" value={ORDER_DETAILS.email} />
              <DetailRow label="Адрес доставки" value={ORDER_DETAILS.address} />
              <DetailRow label="Сумма покупки" value={ORDER_DETAILS.total} />
            </div>

            {/* Order items */}
            {ORDER_DETAILS.items.map((item) => (
              <div key={item} className="w-full rounded-q-card border border-q-border p-5">
                <p className="text-q-dark text-[18px] font-medium leading-[1.08]">{item}</p>
              </div>
            ))}

            <Link href="/orders">
              <Button variant="dark" size="md" icon={<ArrowUpRight size={18} />}>
                Перейти в заказы
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
