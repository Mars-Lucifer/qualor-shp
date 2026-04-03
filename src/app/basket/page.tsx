'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { Button } from '@/app/components/Button';
import { InputWhite } from '@/app/components/Input';
import { ShoppingCart } from 'lucide-react';
import { PRODUCT_IMAGES } from '@/app/data/productImages';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

const INITIAL_CART: CartItem[] = [
  { id: 1, name: 'Microsoft Surface Pro', price: 1200, image: PRODUCT_IMAGES.surfacePro },
  { id: 3, name: 'Google Pixel Slate', price: 1200, image: PRODUCT_IMAGES.googlePixelSlate },
];

export default function BasketPage() {
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
  });
  const router = useRouter();

  const removeItem = (id: number) => setCart((c) => c.filter((item) => item.id !== id));
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/basket/success');
  };

  return (
    <div className="min-h-screen bg-white font-[Inter,sans-serif]">
      <Header isLoggedIn={true} />

      <main className="px-4 sm:px-6 xl:px-[60px] max-w-[1440px] mx-auto py-8 sm:py-10">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-6">
            <ShoppingCart size={64} className="text-q-border" />
            <p className="text-q-muted text-2xl font-medium">Корзина пуста</p>
            <Link href="/catalog">
              <Button variant="dark">Перейти в каталог</Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 xl:gap-10 items-start">
            {/* Cart items */}
            <div className="flex-1 min-w-0 flex flex-col gap-8 sm:gap-10">
              <h1 className="text-q-dark text-[36px] sm:text-[48px] font-medium leading-[1.08]">
                Ваша корзина
              </h1>

              <div className="flex flex-col gap-3.5">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-q-card border border-q-border p-6 sm:p-8 flex gap-4 sm:gap-5 items-start transition-all duration-200 hover:shadow-sm"
                  >
                    <div className="size-[120px] sm:size-[150px] shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex flex-col gap-4 flex-1 min-w-0 self-stretch">
                      <p className="text-q-dark text-xl sm:text-2xl font-medium leading-[1.08] flex-1">
                        {item.name}
                      </p>
                      <div className="flex items-end justify-between">
                        <div className="flex items-end gap-1 font-medium leading-[1.08] whitespace-nowrap">
                          <span className="text-q-dark text-2xl">{item.price.toLocaleString('ru-RU')}</span>
                          <span className="text-q-muted text-[18px]">$</span>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
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

            {/* Checkout panel */}
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
                    onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                    required
                  />
                  <InputWhite
                    type="tel"
                    placeholder="Номер телефона"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    required
                  />
                  <InputWhite
                    type="email"
                    placeholder="Эл. почта"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    required
                  />
                  <InputWhite
                    type="text"
                    placeholder="Адрес доставки"
                    value={form.address}
                    onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                    required
                  />

                  <div className="flex flex-col gap-3 mt-2">
                    <div className="flex items-center gap-5">
                      <div className="flex items-end gap-1 font-medium leading-[1.08] whitespace-nowrap flex-1">
                        <span className="text-q-dark text-[40px]">{total.toLocaleString('ru-RU')}</span>
                        <span className="text-q-muted text-2xl">$</span>
                      </div>
                      <Button
                        variant="accent"
                        size="md"
                        type="submit"
                        className="flex-1 justify-center"
                        icon={<ShoppingCart size={18} />}
                      >
                        Оплатить
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