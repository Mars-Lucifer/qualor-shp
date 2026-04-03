'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, ShoppingCart, Star } from 'lucide-react';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { Button } from '@/app/components/Button';
import { PRODUCT_IMAGES } from '@/app/data/productImages';

const PRODUCTS: Record<string, {
  name: string;
  price: number;
  rating: number;
  reviews: number;
  images: string[];
  specs: { label: string; value: string }[];
}> = {
  '1': {
    name: 'Microsoft Surface Pro',
    price: 1200,
    rating: 4,
    reviews: 40,
    images: [PRODUCT_IMAGES.surfacePro, PRODUCT_IMAGES.surfaceNePro, PRODUCT_IMAGES.googlePixelSlate],
    specs: [
      { label: 'Бренд', value: 'Microsoft' },
      { label: 'Диагональ экрана', value: '14"' },
      { label: 'Процессор', value: 'Intel Core i5' },
      { label: 'ОЗУ', value: '16 Гб' },
      { label: 'Накопитель', value: '500 Гб' },
      { label: 'Видеокарта', value: 'Nvidia GeForce RTX 3050' },
    ],
  },
  '2': {
    name: 'Microsoft Surface NePro',
    price: 1200,
    rating: 4,
    reviews: 22,
    images: [PRODUCT_IMAGES.surfaceNePro, PRODUCT_IMAGES.surfacePro],
    specs: [
      { label: 'Бренд', value: 'Microsoft' },
      { label: 'Диагональ экрана', value: '13.5"' },
      { label: 'Процессор', value: 'Intel Core i7' },
      { label: 'ОЗУ', value: '8 Гб' },
      { label: 'Накопитель', value: '256 Гб' },
      { label: 'Видеокарта', value: 'Intel Iris Xe' },
    ],
  },
};

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={18}
          fill={i < rating ? 'var(--q-star)' : 'var(--q-muted)'}
          stroke="none"
        />
      ))}
    </div>
  );
}

export default function ItemPage() {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS[id || '1'] || PRODUCTS['1'];
  const [currentImage, setCurrentImage] = useState(0);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white font-[Inter,sans-serif]">
      <Header isLoggedIn={true} />

      <main className="px-4 sm:px-6 xl:px-[60px] max-w-[1440px] mx-auto py-8 sm:py-10">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-10">
          {/* Image section */}
          <div className="flex flex-col items-center gap-6 lg:w-[48%] xl:w-[500px] shrink-0">
            <div className="w-full aspect-square sm:aspect-[4/3] max-w-[600px] flex items-center justify-center bg-white">
              <img
                src={product.images[currentImage]}
                alt={product.name}
                className="max-w-full max-h-full object-contain transition-opacity duration-300"
              />
            </div>

            {/* Navigation arrows */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentImage((c) => (c - 1 + product.images.length) % product.images.length)}
                  className="size-11 rounded-full border border-q-dark flex items-center justify-center text-q-muted hover:bg-q-dark hover:text-white transition-all duration-150 active:scale-90"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setCurrentImage((c) => (c + 1) % product.images.length)}
                  className="size-11 rounded-full border border-q-dark flex items-center justify-center text-q-muted hover:bg-q-dark hover:text-white transition-all duration-150 active:scale-90"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Info section */}
          <div className="flex flex-col gap-10 flex-1 min-w-0">
            {/* Title & rating */}
            <div className="flex flex-col gap-3.5">
              <h1 className="text-q-dark text-[36px] sm:text-[48px] font-medium leading-[1.08]">
                {product.name}
              </h1>
              <div className="flex items-center gap-3.5">
                <StarRating rating={product.rating} />
                <span className="text-q-muted text-base font-medium">
                  {product.reviews} отзывов
                </span>
              </div>
            </div>

            {/* Specs */}
            <div className="flex flex-col gap-3.5">
              {product.specs.map((spec) => (
                <div key={spec.label} className="flex items-center justify-between text-base font-medium">
                  <span className="text-q-muted">{spec.label}</span>
                  <span className="text-q-dark text-right">{spec.value}</span>
                </div>
              ))}
            </div>

            {/* Price & cart */}
            <div className="flex items-center gap-5">
              <div className="flex items-end gap-1 leading-[1.08] font-medium flex-1">
                <span className="text-q-dark text-[40px]">{product.price.toLocaleString('ru-RU')}</span>
                <span className="text-q-muted text-2xl">$</span>
              </div>
              <Button
                variant={added ? 'dark' : 'accent'}
                size="md"
                className="flex-1 sm:flex-none sm:w-[315px] justify-center transition-all duration-300"
                icon={<ShoppingCart size={18} />}
                onClick={handleAddToCart}
              >
                {added ? 'Добавлено!' : 'В корзину'}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
