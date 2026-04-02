"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { ProductCard } from "@/app/components/ProductCard";
import { InputSearch } from "@/app/components/Input";
import { Button } from "@/app/components/Button";
import { PRODUCT_IMAGES } from "@/app/data/productImages";

const CATEGORIES = ["Ноутбуки", "Мини ПК", "Периферия"];
const SORT_OPTIONS = [
  "По популярности",
  "По рейтингу",
  "(Цена) По возрастанию",
  "(Цена) По убыванию",
];
const BRANDS = [
  "Microsoft",
  "Honor",
  "HP",
  "Dell",
  "Apple",
  "Lenovo",
  "Asus",
  "Acer",
  "Samsung",
  "Razer",
];
const PROCESSORS = ["Intel", "AMD", "Arm", "Apple"];
const GPU_TYPES = ["Встроенная", "Дискретная"];

const ALL_PRODUCTS = [
  {
    id: 1,
    name: "Microsoft Surface Pro",
    price: 1200,
    image: PRODUCT_IMAGES.surfacePro,
  },
  {
    id: 2,
    name: "Microsoft Surface NePro",
    price: 1200,
    image: PRODUCT_IMAGES.surfaceNePro,
  },
  {
    id: 3,
    name: "Google Pixel Slate",
    price: 650,
    image: PRODUCT_IMAGES.googlePixelSlate,
  },
  {
    id: 4,
    name: "Lenovo Yoga Smart Tab",
    price: 450,
    image: PRODUCT_IMAGES.lenovoYoga,
  },
  {
    id: 5,
    name: "Apple iPad Pro",
    price: 1100,
    image: PRODUCT_IMAGES.appleiPad,
  },
  {
    id: 6,
    name: "Samsung Galaxy Tab S8",
    price: 900,
    image: PRODUCT_IMAGES.samsungTab,
  },
  { id: 7, name: "Microsoft Surface NePro", price: 1200, image: undefined },
  {
    id: 8,
    name: "HP Spectre Visionary 7000 Red",
    price: 1200,
    image: undefined,
  },
  { id: 9, name: "Dell XPS 15 9500", price: 1600, image: undefined },
  { id: 10, name: "Apple MacBook Pro 16-inch", price: 2400, image: undefined },
  { id: 11, name: "Lenovo ThinkPad X1 Carbon", price: 1400, image: undefined },
  { id: 12, name: "ASUS ROG Zephyrus G14", price: 1800, image: undefined },
  { id: 13, name: "Microsoft Surface Laptop 4", price: 1300, image: undefined },
  { id: 14, name: "Razer Blade 15 Advanced", price: 2200, image: undefined },
  { id: 15, name: "Acer Swift 3", price: 900, image: undefined },
];

interface FilterState {
  category: string;
  sort: string;
  priceFrom: string;
  priceTo: string;
  brands: string[];
  screenFrom: string;
  screenTo: string;
  processor: string;
  ramFrom: string;
  ramTo: string;
  storageFrom: string;
  storageTo: string;
  gpu: string;
}

function RadioGroup({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((opt) => (
        <label
          key={opt}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div
            onClick={() => onChange(opt)}
            className={[
              "size-4 rounded-full border-2 flex items-center justify-center transition-all duration-150 shrink-0",
              value === opt
                ? "border-[#1F2128]"
                : "border-[#D6D6DB] group-hover:border-[#7E8395]",
            ].join(" ")}
          >
            {value === opt && (
              <div className="size-2 rounded-full bg-[#1F2128]" />
            )}
          </div>
          <span className="text-[#1F2128] text-base font-medium">{opt}</span>
        </label>
      ))}
    </div>
  );
}

function CheckboxGroup({
  options,
  values,
  onChange,
}: {
  options: string[];
  values: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (opt: string) => {
    onChange(
      values.includes(opt) ? values.filter((v) => v !== opt) : [...values, opt],
    );
  };
  return (
    <div className="flex flex-col gap-2">
      {options.map((opt) => (
        <label
          key={opt}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div
            onClick={() => toggle(opt)}
            className={[
              "size-4 rounded border-2 flex items-center justify-center transition-all duration-150 shrink-0",
              values.includes(opt)
                ? "border-[#1F2128] bg-[#1F2128]"
                : "border-[#D6D6DB] group-hover:border-[#7E8395]",
            ].join(" ")}
          >
            {values.includes(opt) && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path
                  d="M1 4L3.5 6.5L9 1"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <span className="text-[#1F2128] text-base font-medium">{opt}</span>
        </label>
      ))}
    </div>
  );
}

function RangeInputs({
  fromPlaceholder,
  toPlaceholder,
  fromValue,
  toValue,
  onFromChange,
  onToChange,
}: {
  fromPlaceholder: string;
  toPlaceholder: string;
  fromValue: string;
  toValue: string;
  onFromChange: (v: string) => void;
  onToChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        placeholder={fromPlaceholder}
        value={fromValue}
        onChange={(e) => onFromChange(e.target.value)}
        className="flex-1 min-w-0 bg-[#F5F5F5] rounded-[14px] px-3 py-2 text-sm font-medium text-[#1F2128] placeholder:text-[#7E8395] outline-none focus:ring-2 focus:ring-[#1F2128]/20 transition-all duration-150"
      />
      <input
        type="number"
        placeholder={toPlaceholder}
        value={toValue}
        onChange={(e) => onToChange(e.target.value)}
        className="flex-1 min-w-0 bg-[#F5F5F5] rounded-[14px] px-3 py-2 text-sm font-medium text-[#1F2128] placeholder:text-[#7E8395] outline-none focus:ring-2 focus:ring-[#1F2128]/20 transition-all duration-150"
      />
    </div>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-[#1F2128] text-base font-medium">{title}</h3>
      {children}
      <div className="h-px bg-[#D6D6DB] mt-1" />
    </div>
  );
}

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    category: "Ноутбуки",
    sort: "По популярности",
    priceFrom: "",
    priceTo: "",
    brands: [],
    screenFrom: "",
    screenTo: "",
    processor: "",
    ramFrom: "",
    ramTo: "",
    storageFrom: "",
    storageTo: "",
    gpu: "",
  });

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => setFilters((prev) => ({ ...prev, [key]: value }));

  const filteredProducts = ALL_PRODUCTS.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()))
      return false;
    if (filters.priceFrom && p.price < parseInt(filters.priceFrom))
      return false;
    if (filters.priceTo && p.price > parseInt(filters.priceTo)) return false;
    return true;
  });

  const FilterPanel = () => (
    <div className="flex flex-col gap-6">
      <FilterSection title="Категория">
        <RadioGroup
          options={CATEGORIES}
          value={filters.category}
          onChange={(v) => updateFilter("category", v)}
        />
      </FilterSection>

      <FilterSection title="Сортировка">
        <RadioGroup
          options={SORT_OPTIONS}
          value={filters.sort}
          onChange={(v) => updateFilter("sort", v)}
        />
      </FilterSection>

      <FilterSection title="Фильтры">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-[#1F2128] text-sm font-medium mb-2">Цена</p>
            <RangeInputs
              fromPlaceholder="От ₽"
              toPlaceholder="До ₽"
              fromValue={filters.priceFrom}
              toValue={filters.priceTo}
              onFromChange={(v) => updateFilter("priceFrom", v)}
              onToChange={(v) => updateFilter("priceTo", v)}
            />
          </div>

          <div>
            <p className="text-[#1F2128] text-sm font-medium mb-2">Бренд</p>
            <CheckboxGroup
              options={BRANDS}
              values={filters.brands}
              onChange={(v) => updateFilter("brands", v)}
            />
          </div>

          <div>
            <p className="text-[#1F2128] text-sm font-medium mb-2">
              Диагональ экрана
            </p>
            <RangeInputs
              fromPlaceholder='От "'
              toPlaceholder='До "'
              fromValue={filters.screenFrom}
              toValue={filters.screenTo}
              onFromChange={(v) => updateFilter("screenFrom", v)}
              onToChange={(v) => updateFilter("screenTo", v)}
            />
          </div>

          <div>
            <p className="text-[#1F2128] text-sm font-medium mb-2">Процессор</p>
            <RadioGroup
              options={PROCESSORS}
              value={filters.processor}
              onChange={(v) => updateFilter("processor", v)}
            />
          </div>

          <div>
            <p className="text-[#1F2128] text-sm font-medium mb-2">ОЗУ</p>
            <RangeInputs
              fromPlaceholder="От Гб"
              toPlaceholder="До Гб"
              fromValue={filters.ramFrom}
              toValue={filters.ramTo}
              onFromChange={(v) => updateFilter("ramFrom", v)}
              onToChange={(v) => updateFilter("ramTo", v)}
            />
          </div>

          <div>
            <p className="text-[#1F2128] text-sm font-medium mb-2">
              Накопитель
            </p>
            <RangeInputs
              fromPlaceholder="От Гб"
              toPlaceholder="До Гб"
              fromValue={filters.storageFrom}
              toValue={filters.storageTo}
              onFromChange={(v) => updateFilter("storageFrom", v)}
              onToChange={(v) => updateFilter("storageTo", v)}
            />
          </div>

          <div>
            <p className="text-[#1F2128] text-sm font-medium mb-2">
              Видеокарта
            </p>
            <RadioGroup
              options={GPU_TYPES}
              value={filters.gpu}
              onChange={(v) => updateFilter("gpu", v)}
            />
          </div>
        </div>
      </FilterSection>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-[Inter,sans-serif]">
      <Header isLoggedIn={true} />

      <main className="px-4 sm:px-6 xl:px-[60px] max-w-[1440px] mx-auto py-8 sm:py-10">
        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-4 flex items-center gap-3">
          <Button
            variant={filtersOpen ? "dark" : "outline"}
            size="md"
            icon={
              filtersOpen ? <X size={18} /> : <SlidersHorizontal size={18} />
            }
            iconPosition="right"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            Фильтры
          </Button>
        </div>

        <div className="flex gap-8 xl:gap-10">
          {/* Sidebar filters */}
          <aside
            className={[
              "shrink-0 w-[200px] xl:w-[220px]",
              "hidden lg:block",
            ].join(" ")}
          >
            <FilterPanel />
          </aside>

          {/* Mobile filters overlay */}
          {filtersOpen && (
            <div className="lg:hidden fixed inset-0 z-40 flex">
              <div
                className="flex-1 bg-black/40"
                onClick={() => setFiltersOpen(false)}
              />
              <div className="w-72 bg-white h-full overflow-y-auto p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-medium text-[#1F2128]">
                    Фильтры
                  </h2>
                  <button onClick={() => setFiltersOpen(false)}>
                    <X size={20} className="text-[#7E8395]" />
                  </button>
                </div>
                <FilterPanel />
              </div>
            </div>
          )}

          {/* Products area */}
          <div className="flex-1 min-w-0">
            {/* Search in catalog */}
            <div className="mb-6">
              <InputSearch
                placeholder="Поиск по названию"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="!bg-[#F5F5F5] !rounded-[14px]"
              />
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  onAddToCart={() => console.log("Add to cart:", product.id)}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-[#7E8395] text-base font-medium">
                  По вашему запросу ничего не найдено
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
