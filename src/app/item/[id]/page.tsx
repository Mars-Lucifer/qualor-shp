'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, ShoppingCart, Star } from 'lucide-react';

import { useAuth } from '@/app/auth-provider';
import { Button } from '@/app/components/Button';
import { Footer } from '@/app/components/Footer';
import { Header } from '@/app/components/Header';
import { apiRequest, processorToLabel, type ProductDetail } from '@/app/lib/api';

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, index) => (
        <Star
          key={index}
          size={18}
          fill={index < rating ? 'var(--q-star)' : 'var(--q-muted)'}
          stroke="none"
        />
      ))}
    </div>
  );
}

export default function ItemPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);

    apiRequest<{ item: ProductDetail }>(`/api/products/${params.id}`)
      .then((response) => {
        if (!cancelled) {
          setProduct(response.item);
          setCurrentImage(0);
          setError('');
        }
      })
      .catch((requestError: Error) => {
        if (!cancelled) {
          setProduct(null);
          setError(requestError.message);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [params.id]);

  const handleAddToCart = async () => {
    if (!product) {
      return;
    }

    if (!user) {
      router.push('/auth');
      return;
    }

    try {
      await apiRequest('/api/cart/items', {
        method: 'POST',
        body: JSON.stringify({ productId: product.id }),
      });
      window.alert('Товар добавлен в корзину');
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : 'Не удалось добавить товар';
      window.alert(message);
    }
  };

  const images = product?.images.length ? product.images : product?.image ? [product.image] : [];

  return (
    <div className="min-h-screen bg-white font-[Inter,sans-serif]">
      <Header />

      <main className="px-4 sm:px-6 xl:px-[60px] max-w-[1440px] mx-auto py-8 sm:py-10">
        {isLoading ? (
          <div className="py-20 text-center text-q-muted">Загрузка товара...</div>
        ) : error || !product ? (
          <div className="py-20 text-center text-q-muted">{error || 'Товар не найден'}</div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 xl:gap-10">
            <div className="flex flex-col items-center gap-6 lg:w-[48%] xl:w-[500px] shrink-0">
              <div className="w-full aspect-square sm:aspect-[4/3] max-w-[600px] flex items-center justify-center bg-white">
                {images[currentImage] ? (
                  <img
                    src={images[currentImage]}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain transition-opacity duration-300"
                  />
                ) : (
                  <div className="text-q-muted">Изображение отсутствует</div>
                )}
              </div>

              {images.length > 1 && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCurrentImage((value) => (value - 1 + images.length) % images.length)}
                    className="size-11 rounded-full border border-q-dark flex items-center justify-center text-q-muted hover:bg-q-dark hover:text-white transition-all duration-150 active:scale-90"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setCurrentImage((value) => (value + 1) % images.length)}
                    className="size-11 rounded-full border border-q-dark flex items-center justify-center text-q-muted hover:bg-q-dark hover:text-white transition-all duration-150 active:scale-90"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-10 flex-1 min-w-0">
              <div className="flex flex-col gap-3.5">
                <h1 className="text-q-dark text-[36px] sm:text-[48px] font-medium leading-[1.08]">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3.5">
                  <StarRating rating={product.rating} />
                  <span className="text-q-muted text-base font-medium">
                    {product.reviewCount} отзывов
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3.5">
                <div className="flex items-center justify-between text-base font-medium">
                  <span className="text-q-muted">Бренд</span>
                  <span className="text-q-dark text-right">{product.brandName}</span>
                </div>
                <div className="flex items-center justify-between text-base font-medium">
                  <span className="text-q-muted">Диагональ экрана</span>
                  <span className="text-q-dark text-right">
                    {product.screenInches ? `${product.screenInches}"` : 'Не указана'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-base font-medium">
                  <span className="text-q-muted">Процессор</span>
                  <span className="text-q-dark text-right">
                    {processorToLabel(product.processor) || 'Не указан'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-base font-medium">
                  <span className="text-q-muted">ОЗУ</span>
                  <span className="text-q-dark text-right">
                    {product.ramGb ? `${product.ramGb} Гб` : 'Не указано'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-base font-medium">
                  <span className="text-q-muted">Накопитель</span>
                  <span className="text-q-dark text-right">
                    {product.storageGb ? `${product.storageGb} Гб` : 'Не указан'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-base font-medium">
                  <span className="text-q-muted">Видеокарта</span>
                  <span className="text-q-dark text-right">
                    {product.graphicsModel ??
                      (product.graphicsType === 'discrete' ? 'Дискретная' : 'Встроенная')}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="flex items-end gap-1 leading-[1.08] font-medium flex-1">
                  <span className="text-q-dark text-[40px]">{product.price.toLocaleString('ru-RU')}</span>
                  <span className="text-q-muted text-2xl">$</span>
                </div>
                <Button
                  variant="accent"
                  size="md"
                  className="flex-1 sm:flex-none sm:w-[315px] justify-center transition-all duration-300"
                  icon={<ShoppingCart size={18} />}
                  onClick={handleAddToCart}
                >
                  В корзину
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
