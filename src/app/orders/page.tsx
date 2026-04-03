'use client';

import { Star } from 'lucide-react';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';

interface OrderProduct {
  name: string;
  price: number;
  rating: number;
}

interface Order {
  id: number;
  date: string;
  total: number;
  items: OrderProduct[];
}

const ORDERS: Order[] = [
  {
    id: 1,
    date: '20.02.2026',
    total: 2400,
    items: [
      { name: 'Microsoft Surface Pro', price: 1200, rating: 4 },
      { name: 'Google Pixel Slate', price: 1200, rating: 4 },
    ],
  },
  {
    id: 2,
    date: '15.08.2026',
    total: 1800,
    items: [
      { name: 'Lenovo Yoga Smart Tab', price: 850, rating: 3 },
    ],
  },
];

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={18}
          fill={i < rating ? 'var(--q-star)' : 'var(--q-border)'}
          stroke="none"
        />
      ))}
    </div>
  );
}

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-white font-[Inter,sans-serif]">
      <Header isLoggedIn={true} />

      <main className="px-4 sm:px-6 xl:px-[60px] max-w-[1440px] mx-auto py-8 sm:py-10">
        <div className="flex flex-col items-center gap-10">
          <h1 className="text-q-dark text-[36px] sm:text-[48px] font-medium leading-[1.08] self-center">
            История заказов
          </h1>

          <div className="flex flex-col gap-3.5 w-full max-w-[700px]">
            {ORDERS.map((order) => (
              <div
                key={order.id}
                className="rounded-q-card border border-q-border p-6 sm:p-8 flex flex-col sm:flex-row gap-6 sm:gap-5 transition-all duration-200 hover:shadow-sm"
              >
                {/* Items */}
                <div className="flex-1 min-w-0 flex flex-col gap-5">
                  {order.items.map((item, i) => (
                    <div key={item.name}>
                      {i > 0 && <div className="h-px bg-q-border mb-5" />}
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-q-muted text-base font-medium flex-1">{item.name}</p>
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <p className="text-q-dark text-base font-medium whitespace-nowrap">
                            {item.price.toLocaleString('ru-RU')} $
                          </p>
                          <StarRating rating={item.rating} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Divider (vertical on desktop) */}
                <div className="hidden sm:block w-px bg-q-border self-stretch mx-2" />
                <div className="sm:hidden h-px bg-q-border" />

                {/* Date & total */}
                <div className="sm:w-40 flex flex-col justify-between gap-3 shrink-0">
                  <p className="text-q-muted text-base font-medium">{order.date}</p>
                  <div className="flex items-center justify-between sm:flex-col sm:items-start gap-2">
                    <p className="text-q-muted text-base font-medium">Сумма</p>
                    <p className="text-q-dark text-base font-medium text-right">
                      {order.total.toLocaleString('ru-RU')} $
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
