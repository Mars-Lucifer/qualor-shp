'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { ProductCard } from '@/app/components/ProductCard';
import { Button } from '@/app/components/Button';
import { PRODUCT_IMAGES } from '@/app/data/productImages';

const CATEGORIES = [
  'Рабочие ноутбуки',
  'Игровые ноутбуки',
  'Мини ПК',
  'Комплектующие',
  'Периферия',
  'Готовые решения',
];

const PRODUCTS = [
  { id: 1, name: 'Microsoft Surface Pro', price: 1200, image: PRODUCT_IMAGES.surfacePro },
  { id: 2, name: 'Microsoft Surface NePro', price: 1200, image: PRODUCT_IMAGES.surfaceNePro },
  { id: 3, name: 'Google Pixel Slate', price: 650, image: PRODUCT_IMAGES.googlePixelSlate },
  { id: 4, name: 'Lenovo Yoga Smart Tab', price: 450, image: PRODUCT_IMAGES.lenovoYoga },
  { id: 5, name: 'Apple iPad Pro', price: 1100, image: PRODUCT_IMAGES.appleiPad },
  { id: 6, name: 'Samsung Galaxy Tab S8', price: 900, image: PRODUCT_IMAGES.samsungTab },
  { id: 7, name: 'Microsoft Surface NePro', price: 1200, image: undefined },
  { id: 8, name: 'HP Spectre Visionary 7000 Red', price: 1200, image: undefined },
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="min-h-screen bg-white font-[Inter,sans-serif]">
      <Header isLoggedIn={false} />

      <main className="px-4 sm:px-6 xl:px-[60px] max-w-[1440px] mx-auto">
        {/* Hero banner section */}
        <section className="mt-6 sm:mt-8">
          <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-none">
            {/* Main dark banner */}
            <div className="bg-q-dark rounded-q-hero p-8 flex flex-col justify-between overflow-hidden relative shrink-0 w-full sm:w-auto sm:flex-1 min-h-[300px] sm:min-h-[400px]">
              {/* Lime glow effect */}
              <div className="absolute right-0 top-[-10%] w-[45%] h-[130%] pointer-events-none">
                <div
                  className="w-full h-full opacity-80"
                  style={{
                    background:
                      'radial-gradient(ellipse at 50% 80%, var(--q-accent) 0%, var(--q-accent) 30%, transparent 70%)',
                    filter: 'blur(32px)',
                  }}
                />
              </div>

              <h2 className="text-white text-[32px] sm:text-[48px] font-medium leading-[1.08] relative z-10 max-w-[500px]">
                Первый запуск особенный
              </h2>

              <div className="flex flex-col gap-5 relative z-10">
                <div className="flex items-end gap-4">
                  <p className="text-q-muted text-sm sm:text-base font-normal flex-1">
                    В честь открытия магазина скидка 10% на все товары в каталоге!
                    <br />Успей купить до конца февраля
                  </p>
                  <p className="text-white text-[40px] sm:text-[64px] font-medium leading-[1.08] text-right shrink-0">
                    28.02.26
                  </p>
                </div>
                {/* Progress bar */}
                <div className="h-1 bg-q-dark-subtle rounded-full w-full">
                  <div className="h-full bg-white rounded-full w-[72%]" />
                </div>
              </div>
            </div>

            {/* Secondary banners */}
            <div className="hidden sm:flex flex-col sm:flex-row gap-5 shrink-0">
              {[
                { title: 'Новый ноутбук Microsoft' },
                { title: 'Он потянет World Of Tanks' },
              ].map((banner, i) => (
                <div
                  key={i}
                  className="h-full sm:h-[400px] w-[280px] sm:w-[315px] rounded-q-hero border border-q-dark p-8 flex flex-col items-start cursor-pointer transition-all duration-200 hover:bg-q-surface"
                >
                  <p className="text-q-dark text-[28px] sm:text-[32px] font-medium leading-[1.08]">
                    {banner.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About section */}
        <section className="mt-14 sm:mt-20 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          <h2 className="text-q-dark text-[36px] sm:text-[48px] font-medium leading-[1.08] max-w-[500px]">
            Перый интернет магазин ноутбуков
          </h2>
          <p className="text-q-muted text-base font-normal leading-normal sm:max-w-[315px]">
            Вы тоже любите ноутбуки и компактность? Тогда нам по пути! Ведь мы первый магазин
            сфокусированный на ноутбуках и компактной электроннике
          </p>
        </section>

        {/* Popular products */}
        <section className="mt-14 sm:mt-20">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-q-dark text-[32px] sm:text-[40px] font-medium leading-[1.08]">
              Популярные товары
            </h2>
            <Link href="/catalog" className="no-underline">
              <Button variant="outline" size="md" icon={<ArrowUpRight size={18} />}>
                Перейти в каталог
              </Button>
            </Link>
          </div>

          {/* Category tabs */}
          <div className="flex gap-6 sm:gap-10 overflow-x-auto pb-2 mb-6 sm:mb-8 scrollbar-none border-b border-q-surface">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(i)}
                className={[
                  'text-xl sm:text-2xl font-medium leading-[1.08] whitespace-nowrap pb-3 border-b-2 transition-all duration-150 shrink-0 cursor-pointer',
                  activeCategory === i
                    ? 'text-q-dark border-q-dark'
                    : 'text-q-muted border-transparent hover:text-q-dark',
                ].join(' ')}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                onAddToCart={() => console.log('Add to cart:', product.id)}
              />
            ))}
          </div>
        </section>

        <div className="mt-20 sm:mt-28" />
      </main>

      <Footer />
    </div>
  );
}
