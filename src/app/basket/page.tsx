'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, X } from 'lucide-react';

import { useAuth } from '@/app/auth-provider';
import { Button } from '@/app/components/Button';
import { Footer } from '@/app/components/Footer';
import { Header } from '@/app/components/Header';
import { InputWhite } from '@/app/components/Input';
import { apiRequest, type CartResponse } from '@/app/lib/api';

export default function BasketPage() {
  const router = useRouter();
  const { user, ready } = useAuth();
  const [cart, setCart] = useState<CartResponse>({ totalPrice: 0, items: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
  });

  useEffect(() => {
    if (!ready) {
      return;
    }

    if (!user) {
      router.replace('/auth');
      return;
    }

    let cancelled = false;

    apiRequest<CartResponse>('/api/cart')
      .then((response) => {
        if (!cancelled) {
          setCart(response);
          setError('');
        }
      })
      .catch((requestError: Error) => {
        if (!cancelled) {
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
  }, [ready, router, user]);

  const removeItem = async (productId: number) => {
    try {
      const response = await apiRequest<CartResponse>(`/api/cart/items/${productId}`, {
        method: 'DELETE',
      });
      setCart(response);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Не удалось удалить товар');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await apiRequest<{ order: { id: number } }>('/api/orders/checkout', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      router.push(`/basket/success?orderId=${response.order.id}`);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Не удалось оформить заказ');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-[Inter,sans-serif]">
      <Header />

      <main className="px-4 sm:px-6 xl:px-[60px] max-w-[1440px] mx-auto py-8 sm:py-10">
        {isLoading ? (
          <div className="py-24 text-center text-q-muted">Загрузка корзины...</div>
        ) : cart.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-6">
            <ShoppingCart size={64} className="text-q-border" />
            <p className="text-q-muted text-2xl font-medium">Корзина пуста</p>
            <Link href="/catalog">
              <Button variant="dark">Перейти в каталог</Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 xl:gap-10 items-start">
            <div className="flex-1 min-w-0 flex flex-col gap-8 sm:gap-10">
              <h1 className="text-q-dark text-[36px] sm:text-[48px] font-medium leading-[1.08]">
                Ваша корзина
              </h1>

              <div className="flex flex-col gap-3.5">
                {cart.items.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="rounded-q-card border border-q-border p-6 sm:p-8 flex gap-4 sm:gap-5 items-start transition-all duration-200 hover:shadow-sm"
                  >
                    <div className="size-[120px] sm:size-[150px] shrink-0">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full rounded-q-card bg-q-surface" />
                      )}
                    </div>
                    <div className="flex flex-col gap-4 flex-1 min-w-0 self-stretch">
                      <p className="text-q-dark text-xl sm:text-2xl font-medium leading-[1.08] flex-1">
                        {item.name}
                      </p>
                      <p className="text-q-muted text-sm font-medium">Количество: {item.quantity}</p>
                      <div className="flex items-end justify-between">
                        <div className="flex items-end gap-1 font-medium leading-[1.08] whitespace-nowrap">
                          <span className="text-q-dark text-2xl">
                            {(item.price * item.quantity).toLocaleString('ru-RU')}
                          </span>
                          <span className="text-q-muted text-[18px]">$</span>
                        </div>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="size-10 rounded-full bg-q-danger flex items-center justify-center text-white hover:bg-q-danger-soft transition-all duration-150 active:scale-90 shrink-0"
                          aria-label="Удалить из корзины"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-[600px] xl:w-[650px] shrink-0">
              <div className="bg-q-surface rounded-q-panel p-8 flex flex-col gap-10">
                <h2 className="text-q-dark text-[36px] sm:text-[48px] font-medium leading-[1.08]">
                  Итого
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <InputWhite
                    type="text"
                    placeholder="ФИО получателя"
                    value={form.fullName}
                    onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))}
                    required
                  />
                  <InputWhite
                    type="tel"
                    placeholder="Номер телефона"
                    value={form.phone}
                    onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                    required
                  />
                  <InputWhite
                    type="email"
                    placeholder="Эл. почта"
                    value={form.email}
                    onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                    required
                  />
                  <InputWhite
                    type="text"
                    placeholder="Адрес доставки"
                    value={form.address}
                    onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))}
                    required
                  />

                  {error && <p className="text-sm text-q-danger">{error}</p>}

                  <div className="flex flex-col gap-3 mt-2">
                    <div className="flex items-center gap-5">
                      <div className="flex items-end gap-1 font-medium leading-[1.08] whitespace-nowrap flex-1">
                        <span className="text-q-dark text-[40px]">{cart.totalPrice.toLocaleString('ru-RU')}</span>
                        <span className="text-q-muted text-2xl">$</span>
                      </div>
                      <Button
                        variant="accent"
                        size="md"
                        type="submit"
                        className="flex-1 justify-center"
                        icon={<ShoppingCart size={18} />}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Оформление...' : 'Оплатить'}
                      </Button>
                    </div>
                    <p className="text-q-muted text-sm font-normal">
                      Нажимая кнопку оплаты, вы подтверждаете согласие с{' '}
                      <a href="#" className="text-q-dark font-medium no-underline hover:underline">
                        условиями оферты
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
