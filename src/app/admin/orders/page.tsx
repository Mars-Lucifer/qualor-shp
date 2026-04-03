'use client';

import { useState } from 'react';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { AdminNav } from '@/app/components/AdminNav';
import { Button } from '@/app/components/Button';
import { Send } from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────────────

interface OrderProduct {
  id: string;
  name: string;
  price: number;
  rating: number;
  maxRating: number;
}

interface Order {
  id: string;
  orderId: string;
  date: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  products: OrderProduct[];
  shipped: boolean;
}

// ─── Mock data ───────────────────────────────────────────────────────────────

const INITIAL_ORDERS: Order[] = [
  {
    id: '1',
    orderId: '123456',
    date: '20.02.2026',
    customerName: 'Иванов Иван Иваныч',
    phone: '8 (800) 555-35-35',
    email: 'hihi@haha.com',
    address: 'Город Тоски, улица грусти, переулок отчаяния, дом 13',
    products: [
      { id: 'p1', name: 'Microsoft Surface Pro', price: 1200, rating: 4, maxRating: 5 },
      { id: 'p2', name: 'Google Pixel Slate', price: 1200, rating: 4, maxRating: 5 },
    ],
    shipped: false,
  },
  {
    id: '2',
    orderId: '123457',
    date: '20.02.2026',
    customerName: 'Иванов Иван Иваныч',
    phone: '8 (800) 555-35-35',
    email: 'hihi@haha.com',
    address: 'Город Тоски, улица грусти, переулок отчаяния, дом 13',
    products: [
      { id: 'p3', name: 'Microsoft Surface Pro', price: 1200, rating: 4, maxRating: 5 },
      { id: 'p4', name: 'Google Pixel Slate', price: 1200, rating: 4, maxRating: 5 },
    ],
    shipped: true,
  },
  {
    id: '3',
    orderId: '123458',
    date: '21.02.2026',
    customerName: 'Петрова Мария Сергеевна',
    phone: '8 (900) 123-45-67',
    email: 'petrov@mail.ru',
    address: 'Город Счастья, проспект Удачи, дом 7, кв 12',
    products: [
      { id: 'p5', name: 'HP EliteBook 840', price: 950, rating: 5, maxRating: 5 },
    ],
    shipped: false,
  },
];

// ─── Star Rating ─────────────────────────────────────────────────────────────

function StarRating({ rating, max }: { rating: number; max: number }) {
  return (
    <div className="flex items-center gap-1">
      <svg width="16" height="15" viewBox="0 0 16 15" fill="none">
        <path
          d="M6.89 0.526C7.16-0.175 8.15-0.175 8.43 0.526L10.05 4.718L14.54 4.968C15.29 5.01 15.6 5.953 15.02 6.427L11.53 9.268L12.68 13.615C12.87 14.342 12.07 14.924 11.44 14.517L7.66 12.081L3.88 14.517C3.25 14.924 2.45 14.342 2.64 13.615L3.79 9.268L0.304 6.427C-0.278 5.953 0.028 5.01 0.779 4.968L5.27 4.718L6.89 0.526Z"
          fill="var(--q-star)"
        />
      </svg>
      <span className="text-q-dark text-base font-medium">
        {rating}/{max}
      </span>
    </div>
  );
}

// ─── Order Card ──────────────────────────────────────────────────────────────

function OrderCard({
  order,
  onShip,
}: {
  order: Order;
  onShip: (id: string) => void;
}) {
  return (
    <div className="relative rounded-q-card w-full border border-q-border">
      <div className="flex flex-col gap-5 p-6 sm:p-8">
        {/* Products + Details row */}
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-8 items-start">
          {/* Products list */}
          <div className="flex flex-col gap-5 flex-1 min-w-0">
            {order.products.map((product, idx) => (
              <div key={product.id}>
                {idx > 0 && <div className="h-px bg-q-border mb-5" />}
                <div className="flex items-center justify-between gap-4">
                  <p className="text-q-muted text-base font-medium flex-1 min-w-0">
                    {product.name}
                  </p>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <p className="text-q-dark text-base font-medium text-right">
                      {product.price} $
                    </p>
                    <StarRating rating={product.rating} max={product.maxRating} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Vertical divider (hidden on mobile) */}
          <div className="hidden lg:block w-px self-stretch bg-q-border shrink-0" />

          {/* Order details */}
          <div className="flex flex-col gap-5 flex-1 min-w-0 text-base font-medium">
            <p className="text-q-muted">{order.date}</p>
            <p className="text-q-muted">{order.customerName}</p>

            <div className="flex items-center justify-between gap-2">
              <span className="text-q-muted">ID</span>
              <span className="text-q-dark text-right">{order.orderId}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-q-muted">Телефон</span>
              <span className="text-q-dark text-right">{order.phone}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-q-muted">Эл. почта</span>
              <span className="text-q-dark text-right">{order.email}</span>
            </div>
            <div className="flex items-start justify-between gap-2">
              <span className="text-q-muted shrink-0">Адрес доставки</span>
              <span className="text-q-dark text-right">{order.address}</span>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="flex justify-end">
          {order.shipped ? (
            <div className="inline-flex items-center gap-2.5 px-[18px] py-3 rounded-full border border-q-border text-q-muted text-base font-medium cursor-default select-none">
              Отправлено
              <Send size={16} className="opacity-50" />
            </div>
          ) : (
            <button
              onClick={() => onShip(order.id)}
              className="inline-flex items-center gap-2.5 px-[18px] py-3 rounded-full bg-q-accent text-q-dark text-base font-medium hover:bg-q-accent-soft active:scale-95 transition-all duration-150 cursor-pointer"
            >
              Отправить
              <Send size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Filter tabs ─────────────────────────────────────────────────────────────

type FilterTab = 'all' | 'pending' | 'shipped';

function FilterBar({
  active,
  onChange,
  counts,
}: {
  active: FilterTab;
  onChange: (v: FilterTab) => void;
  counts: { all: number; pending: number; shipped: number };
}) {
  const tabs: { key: FilterTab; label: string }[] = [
    { key: 'all', label: `Все (${counts.all})` },
    { key: 'pending', label: `Ожидают отправки (${counts.pending})` },
    { key: 'shipped', label: `Отправлено (${counts.shipped})` },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={[
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 cursor-pointer',
            active === tab.key
              ? 'bg-q-dark text-white'
              : 'border border-q-border text-q-muted hover:border-q-dark hover:text-q-dark',
          ].join(' ')}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [filter, setFilter] = useState<FilterTab>('all');

  const handleShip = (id: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, shipped: true } : o))
    );
  };

  const filteredOrders = orders.filter((o) => {
    if (filter === 'pending') return !o.shipped;
    if (filter === 'shipped') return o.shipped;
    return true;
  });

  const counts = {
    all: orders.length,
    pending: orders.filter((o) => !o.shipped).length,
    shipped: orders.filter((o) => o.shipped).length,
  };

  return (
    <div className="min-h-screen bg-white font-[Inter,sans-serif]">
      <Header isLoggedIn={true} />

      <main className="px-4 sm:px-6 xl:px-[60px] max-w-[1440px] mx-auto py-8 sm:py-10">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-10 items-start">
          {/* Orders list */}
          <div className="w-full lg:flex-1 min-w-0">
            <div className="flex flex-col gap-8">
              <h1 className="text-q-dark text-[36px] sm:text-[48px] font-medium leading-[1.08]">
                Заказы
              </h1>

              <FilterBar active={filter} onChange={setFilter} counts={counts} />

              {filteredOrders.length === 0 ? (
                <div className="rounded-q-card border border-q-border p-12 flex items-center justify-center">
                  <p className="text-q-muted text-base font-medium">
                    {filter === 'pending'
                      ? 'Нет заказов, ожидающих отправки'
                      : filter === 'shipped'
                      ? 'Нет отправленных заказов'
                      : 'Нет заказов'}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3.5">
                  {filteredOrders.map((order) => (
                    <OrderCard key={order.id} order={order} onShip={handleShip} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Admin nav */}
          <div className="w-full lg:w-[315px] shrink-0">
            <AdminNav layout="stack" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
