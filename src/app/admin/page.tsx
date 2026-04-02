'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { Button } from '@/app/components/Button';
import { InputGray, InputWhite } from '@/app/components/Input';

const CATEGORIES = ['Ноутбуки', 'Мини ПК', 'Периферия'];
const BRANDS = ['Microsoft', 'Honor', 'HP', 'Dell', 'Apple', 'Lenovo', 'Asus', 'Acer', 'Samsung', 'Razer'];
const PROCESSORS = ['Intel', 'AMD', 'Arm', 'Apple'];
const GPU_TYPES = ['Встроенная', 'Дискретная'];

function RadioItem({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <div
        onClick={onChange}
        className={[
          'size-4 rounded-full border-2 flex items-center justify-center transition-all duration-150 shrink-0',
          checked ? 'border-[#1F2128]' : 'border-[#D6D6DB] group-hover:border-[#7E8395]',
        ].join(' ')}
      >
        {checked && <div className="size-2 rounded-full bg-[#1F2128]" />}
      </div>
      <span className="text-[#1F2128] text-base font-medium">{label}</span>
    </label>
  );
}

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

export default function AdminAddPage() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: 'Ноутбуки',
    brand: '',
    customBrand: '',
    screen: '',
    ram: '',
    storage: '',
    processor: '',
    gpu: '',
    customGpu: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Товар добавлен!');
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
                Добавить товар
              </h1>

              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                {/* Name */}
                <div className="flex flex-col gap-4">
                  <InputWhite
                    type="text"
                    placeholder="Название"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    required
                  />
                  <div className="h-px bg-[#D6D6DB]" />
                </div>

                {/* Category + Price */}
                <div className="flex flex-col gap-4">
                  <div className="flex gap-5 items-start">
                    <div className="flex flex-col gap-2">
                      <p className="text-[#1F2128] text-base font-medium">Категория</p>
                      {CATEGORIES.map((cat) => (
                        <RadioItem
                          key={cat}
                          label={cat}
                          checked={form.category === cat}
                          onChange={() => setForm((f) => ({ ...f, category: cat }))}
                        />
                      ))}
                    </div>
                    <div className="flex-1">
                      <InputWhite
                        type="number"
                        placeholder="Цена"
                        value={form.price}
                        onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div className="h-px bg-[#D6D6DB]" />
                </div>

                {/* Brand */}
                <div className="flex flex-col gap-4">
                  <p className="text-[#1F2128] text-base font-medium">Бренд</p>
                  <div className="flex flex-wrap gap-3">
                    {BRANDS.map((brand) => (
                      <RadioItem
                        key={brand}
                        label={brand}
                        checked={form.brand === brand}
                        onChange={() => setForm((f) => ({ ...f, brand: brand, customBrand: '' }))}
                      />
                    ))}
                    <RadioItem
                      label="Добавить бренд"
                      checked={form.brand === '__custom'}
                      onChange={() => setForm((f) => ({ ...f, brand: '__custom' }))}
                    />
                  </div>
                  {form.brand === '__custom' && (
                    <InputGray
                      type="text"
                      placeholder="Новый бренд"
                      value={form.customBrand}
                      onChange={(e) => setForm((f) => ({ ...f, customBrand: e.target.value }))}
                    />
                  )}
                  <div className="h-px bg-[#D6D6DB]" />
                </div>

                {/* Specs */}
                <div className="flex flex-col gap-4">
                  <p className="text-[#1F2128] text-base font-medium">Характеристики</p>
                  <div className="flex flex-wrap gap-3">
                    <InputWhite
                      type="number"
                      placeholder='Диагональ экрана'
                      className="w-36"
                      value={form.screen}
                      onChange={(e) => setForm((f) => ({ ...f, screen: e.target.value }))}
                    />
                    <InputWhite
                      type="number"
                      placeholder='ОЗУ (Гб)'
                      className="w-28"
                      value={form.ram}
                      onChange={(e) => setForm((f) => ({ ...f, ram: e.target.value }))}
                    />
                    <InputWhite
                      type="number"
                      placeholder='Накопитель (Гб)'
                      className="w-36"
                      value={form.storage}
                      onChange={(e) => setForm((f) => ({ ...f, storage: e.target.value }))}
                    />
                  </div>

                  <p className="text-[#1F2128] text-base font-medium">Процессор</p>
                  <div className="flex flex-wrap gap-3">
                    {PROCESSORS.map((proc) => (
                      <RadioItem
                        key={proc}
                        label={proc}
                        checked={form.processor === proc}
                        onChange={() => setForm((f) => ({ ...f, processor: proc }))}
                      />
                    ))}
                  </div>

                  <p className="text-[#1F2128] text-base font-medium">Видеокарта</p>
                  <div className="flex flex-wrap gap-3">
                    {GPU_TYPES.map((gpu) => (
                      <RadioItem
                        key={gpu}
                        label={gpu}
                        checked={form.gpu === gpu}
                        onChange={() => setForm((f) => ({ ...f, gpu: gpu, customGpu: '' }))}
                      />
                    ))}
                  </div>
                  <InputGray
                    type="text"
                    placeholder="Видеокарта"
                    value={form.customGpu}
                    onChange={(e) => setForm((f) => ({ ...f, customGpu: e.target.value }))}
                  />
                </div>

                <Button variant="accent" size="md" fullWidth type="submit">
                  Добавить
                </Button>
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
