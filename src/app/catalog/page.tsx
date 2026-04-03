"use client";

import { useMemo, useState, type ReactNode } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { ProductCard } from "@/app/components/ProductCard";
import { InputField, InputSearch } from "@/app/components/Input";
import { Button } from "@/app/components/Button";
import { PRODUCT_IMAGES } from "@/app/data/productImages";

const CATEGORIES = ["Все", "Ноутбуки", "Мини ПК", "Периферия"] as const;
const SORT_OPTIONS = [
  { value: "popular", label: "По популярности" },
  { value: "rating", label: "По рейтингу" },
  { value: "price_asc", label: "(Цена) По возрастанию" },
  { value: "price_desc", label: "(Цена) По убыванию" },
] as const;
const GPU_TYPES = ["Встроенная", "Дискретная"] as const;

type CategoryKey = (typeof CATEGORIES)[number];
type SortKey = (typeof SORT_OPTIONS)[number]["value"];
type GpuType = (typeof GPU_TYPES)[number];

interface CatalogProduct {
  id: number;
  name: string;
  price: number;
  image?: string;
  category: Exclude<CategoryKey, "Все">;
  brand: string;
  processor: string;
  gpu: GpuType;
  screenInches: number;
  ramGb: number;
  storageGb: number;
  rating: number;
  popularity: number;
}

interface FilterState {
  category: CategoryKey;
  sort: SortKey;
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
  gpu: "" | GpuType;
}

const INITIAL_FILTERS: FilterState = {
  category: "Все",
  sort: "popular",
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
};

const RANGE_KEYS = [
  "priceFrom",
  "priceTo",
  "screenFrom",
  "screenTo",
  "ramFrom",
  "ramTo",
  "storageFrom",
  "storageTo",
] as const;

type RangeKey = (typeof RANGE_KEYS)[number];

const ALL_PRODUCTS: CatalogProduct[] = [
  {
    id: 1,
    name: "Microsoft Surface Pro",
    price: 1200,
    image: PRODUCT_IMAGES.surfacePro,
    category: "Ноутбуки",
    brand: "Microsoft",
    processor: "Intel",
    gpu: "Встроенная",
    screenInches: 13.0,
    ramGb: 16,
    storageGb: 512,
    rating: 4.7,
    popularity: 92,
  },
  {
    id: 2,
    name: "Microsoft Surface NePro",
    price: 1200,
    image: PRODUCT_IMAGES.surfaceNePro,
    category: "Ноутбуки",
    brand: "Microsoft",
    processor: "Intel",
    gpu: "Встроенная",
    screenInches: 13.5,
    ramGb: 8,
    storageGb: 256,
    rating: 4.4,
    popularity: 84,
  },
  {
    id: 3,
    name: "Google Pixel Slate",
    price: 650,
    image: PRODUCT_IMAGES.googlePixelSlate,
    category: "Мини ПК",
    brand: "Google",
    processor: "Arm",
    gpu: "Встроенная",
    screenInches: 12.3,
    ramGb: 8,
    storageGb: 128,
    rating: 4.2,
    popularity: 68,
  },
  {
    id: 4,
    name: "Lenovo Yoga Smart Tab",
    price: 450,
    image: PRODUCT_IMAGES.lenovoYoga,
    category: "Периферия",
    brand: "Lenovo",
    processor: "Arm",
    gpu: "Встроенная",
    screenInches: 10.1,
    ramGb: 4,
    storageGb: 64,
    rating: 4.0,
    popularity: 63,
  },
  {
    id: 5,
    name: "Apple iPad Pro",
    price: 1100,
    image: PRODUCT_IMAGES.appleiPad,
    category: "Периферия",
    brand: "Apple",
    processor: "Arm",
    gpu: "Встроенная",
    screenInches: 12.9,
    ramGb: 8,
    storageGb: 256,
    rating: 4.8,
    popularity: 90,
  },
  {
    id: 6,
    name: "Samsung Galaxy Tab S8",
    price: 900,
    image: PRODUCT_IMAGES.samsungTab,
    category: "Периферия",
    brand: "Samsung",
    processor: "Arm",
    gpu: "Встроенная",
    screenInches: 11.0,
    ramGb: 8,
    storageGb: 128,
    rating: 4.5,
    popularity: 76,
  },
  {
    id: 7,
    name: "HP Spectre Visionary 7000 Red",
    price: 1200,
    category: "Ноутбуки",
    brand: "HP",
    processor: "Intel",
    gpu: "Дискретная",
    screenInches: 15.6,
    ramGb: 16,
    storageGb: 512,
    rating: 4.4,
    popularity: 71,
  },
  {
    id: 8,
    name: "Dell XPS 15 9500",
    price: 1600,
    category: "Ноутбуки",
    brand: "Dell",
    processor: "Intel",
    gpu: "Дискретная",
    screenInches: 15.6,
    ramGb: 16,
    storageGb: 1024,
    rating: 4.6,
    popularity: 81,
  },
  {
    id: 9,
    name: "Apple MacBook Pro 16-inch",
    price: 2400,
    category: "Ноутбуки",
    brand: "Apple",
    processor: "Arm",
    gpu: "Встроенная",
    screenInches: 16.0,
    ramGb: 32,
    storageGb: 1024,
    rating: 4.9,
    popularity: 95,
  },
  {
    id: 10,
    name: "Lenovo ThinkPad X1 Carbon",
    price: 1400,
    category: "Ноутбуки",
    brand: "Lenovo",
    processor: "Intel",
    gpu: "Встроенная",
    screenInches: 14.0,
    ramGb: 16,
    storageGb: 512,
    rating: 4.6,
    popularity: 78,
  },
  {
    id: 11,
    name: "ASUS ROG Zephyrus G14",
    price: 1800,
    category: "Ноутбуки",
    brand: "Asus",
    processor: "AMD",
    gpu: "Дискретная",
    screenInches: 14.0,
    ramGb: 16,
    storageGb: 1024,
    rating: 4.7,
    popularity: 88,
  },
  {
    id: 12,
    name: "Microsoft Surface Laptop 4",
    price: 1300,
    category: "Ноутбуки",
    brand: "Microsoft",
    processor: "Intel",
    gpu: "Встроенная",
    screenInches: 13.5,
    ramGb: 8,
    storageGb: 256,
    rating: 4.3,
    popularity: 70,
  },
  {
    id: 13,
    name: "Razer Blade 15 Advanced",
    price: 2200,
    category: "Ноутбуки",
    brand: "Razer",
    processor: "Intel",
    gpu: "Дискретная",
    screenInches: 15.6,
    ramGb: 32,
    storageGb: 1024,
    rating: 4.6,
    popularity: 73,
  },
  {
    id: 14,
    name: "Acer Swift 3",
    price: 900,
    category: "Ноутбуки",
    brand: "Acer",
    processor: "AMD",
    gpu: "Встроенная",
    screenInches: 14.0,
    ramGb: 8,
    storageGb: 512,
    rating: 4.1,
    popularity: 67,
  },
  {
    id: 15,
    name: "Honor MagicBook X",
    price: 1000,
    category: "Ноутбуки",
    brand: "Honor",
    processor: "Intel",
    gpu: "Встроенная",
    screenInches: 15.6,
    ramGb: 16,
    storageGb: 512,
    rating: 4.2,
    popularity: 65,
  },
];

const BRAND_OPTIONS = Array.from(new Set(ALL_PRODUCTS.map((p) => p.brand))).sort(
  (a, b) => a.localeCompare(b),
);
const PROCESSOR_OPTIONS = Array.from(
  new Set(ALL_PRODUCTS.map((p) => p.processor)),
).sort((a, b) => a.localeCompare(b));

function parseDigits(value: string): number | undefined {
  if (!value) return undefined;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return undefined;
  return parsed;
}

function sanitizeDigits(value: string): string {
  return value.replace(/[^\d]/g, "");
}

function inRange(value: number, from?: number, to?: number) {
  if (from !== undefined && value < from) return false;
  if (to !== undefined && value > to) return false;
  return true;
}

function FilterSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-q-dark text-sm font-semibold">{title}</h3>
      {children}
    </section>
  );
}

function RadioGroup({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((option) => {
        const checked = value === option;
        return (
          <label key={option} className="inline-flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              name={name}
              value={option}
              checked={checked}
              onChange={() => onChange(option)}
              className="sr-only"
            />
            <span
              className={[
                "size-[18px] rounded-full bg-q-surface border flex items-center justify-center transition-all",
                checked ? "border-q-dark" : "border-q-border group-hover:border-q-muted",
              ].join(" ")}
            >
              {checked && <span className="size-[8px] rounded-full bg-q-dark" />}
            </span>
            <span className={["text-base transition-colors", checked ? "text-q-dark" : "text-q-muted"].join(" ")}>
              {option}
            </span>
          </label>
        );
      })}
    </div>
  );
}

function CheckboxGroup({
  options,
  values,
  onToggle,
}: {
  options: string[];
  values: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2 max-h-52 overflow-auto pr-1">
      {options.map((option) => {
        const checked = values.includes(option);
        return (
          <label key={option} className="inline-flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" checked={checked} onChange={() => onToggle(option)} className="sr-only" />
            <span
              className={[
                "size-[18px] rounded-[6px] border flex items-center justify-center transition-all",
                checked
                  ? "bg-q-dark border-q-dark"
                  : "bg-q-surface border-q-border group-hover:border-q-muted",
              ].join(" ")}
            >
              {checked && (
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
            </span>
            <span className={["text-base transition-colors", checked ? "text-q-dark" : "text-q-muted"].join(" ")}>
              {option}
            </span>
          </label>
        );
      })}
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
  onFromCommit,
  onToCommit,
}: {
  fromPlaceholder: string;
  toPlaceholder: string;
  fromValue: string;
  toValue: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
  onFromCommit: (value: string) => void;
  onToCommit: (value: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <InputField
        type="text"
        inputMode="numeric"
        autoComplete="off"
        spellCheck={false}
        placeholder={fromPlaceholder}
        value={fromValue}
        onChange={(e) => onFromChange(sanitizeDigits(e.target.value))}
        onBlur={(e) => onFromCommit(sanitizeDigits(e.target.value))}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onFromCommit(sanitizeDigits(e.currentTarget.value));
          }
        }}
        tone="surface"
        border="muted"
        className="flex-1 min-w-0 px-3 py-2 text-sm"
      />
      <InputField
        type="text"
        inputMode="numeric"
        autoComplete="off"
        spellCheck={false}
        placeholder={toPlaceholder}
        value={toValue}
        onChange={(e) => onToChange(sanitizeDigits(e.target.value))}
        onBlur={(e) => onToCommit(sanitizeDigits(e.target.value))}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onToCommit(sanitizeDigits(e.currentTarget.value));
          }
        }}
        tone="surface"
        border="muted"
        className="flex-1 min-w-0 px-3 py-2 text-sm"
      />
    </div>
  );
}

export default function CatalogPage() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [draftFilters, setDraftFilters] = useState<FilterState>(INITIAL_FILTERS);

  const updateInstantFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setDraftFilters((prev) => ({ ...prev, [key]: value }));
  };

  const updateDraftRange = (key: RangeKey, value: string) => {
    setDraftFilters((prev) => ({ ...prev, [key]: value }));
  };

  const commitRangeField = (key: RangeKey, value: string) => {
    setDraftFilters((prev) => ({ ...prev, [key]: value }));
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const commitSearch = (value: string) => {
    setSearchInput(value);
    setSearch(value.trim());
  };

  const toggleBrand = (brand: string) => {
    const nextBrands = filters.brands.includes(brand)
      ? filters.brands.filter((item) => item !== brand)
      : [...filters.brands, brand];
    updateInstantFilter("brands", nextBrands);
  };

  const clearFilters = () => {
    setFilters(INITIAL_FILTERS);
    setDraftFilters(INITIAL_FILTERS);
    setSearchInput("");
    setSearch("");
  };

  const filteredProducts = useMemo(() => {
    const preparedSearch = search.toLowerCase();

    const priceFrom = parseDigits(filters.priceFrom);
    const priceTo = parseDigits(filters.priceTo);
    const screenFrom = parseDigits(filters.screenFrom);
    const screenTo = parseDigits(filters.screenTo);
    const ramFrom = parseDigits(filters.ramFrom);
    const ramTo = parseDigits(filters.ramTo);
    const storageFrom = parseDigits(filters.storageFrom);
    const storageTo = parseDigits(filters.storageTo);

    const prepared = ALL_PRODUCTS.filter((product) => {
      if (preparedSearch && !product.name.toLowerCase().includes(preparedSearch)) {
        return false;
      }

      if (filters.category !== "Все" && product.category !== filters.category) {
        return false;
      }
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }
      if (filters.processor && product.processor !== filters.processor) {
        return false;
      }
      if (filters.gpu && product.gpu !== filters.gpu) {
        return false;
      }

      if (!inRange(product.price, priceFrom, priceTo)) return false;
      if (!inRange(product.screenInches, screenFrom, screenTo)) return false;
      if (!inRange(product.ramGb, ramFrom, ramTo)) return false;
      if (!inRange(product.storageGb, storageFrom, storageTo)) return false;

      return true;
    });

    return prepared.sort((a, b) => {
      switch (filters.sort) {
        case "rating":
          return b.rating - a.rating;
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "popular":
        default:
          return b.popularity - a.popularity;
      }
    });
  }, [filters, search]);

  const sortLabelMap = Object.fromEntries(
    SORT_OPTIONS.map((item) => [item.value, item.label]),
  ) as Record<SortKey, string>;

  const renderFilterPanel = () => (
    <div className="bg-q-surface rounded-q-card p-5 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-q-muted">
          Найдено: <span className="text-q-dark font-semibold">{filteredProducts.length}</span>
        </p>
        <Button variant="outlineMuted" size="sm" onClick={clearFilters}>
          Сбросить
        </Button>
      </div>

      <FilterSection title="Категория">
        <RadioGroup
          name="category-filter"
          options={CATEGORIES}
          value={filters.category}
          onChange={(value) => updateInstantFilter("category", value as CategoryKey)}
        />
      </FilterSection>

      <FilterSection title="Сортировка">
        <RadioGroup
          name="sort-filter"
          options={SORT_OPTIONS.map((item) => item.label)}
          value={sortLabelMap[filters.sort]}
          onChange={(label) => {
            const selected = SORT_OPTIONS.find((item) => item.label === label);
            if (selected) {
              updateInstantFilter("sort", selected.value);
            }
          }}
        />
      </FilterSection>

      <FilterSection title="Цена">
        <RangeInputs
          fromPlaceholder="От ₽"
          toPlaceholder="До ₽"
          fromValue={draftFilters.priceFrom}
          toValue={draftFilters.priceTo}
          onFromChange={(value) => updateDraftRange("priceFrom", value)}
          onToChange={(value) => updateDraftRange("priceTo", value)}
          onFromCommit={(value) => commitRangeField("priceFrom", value)}
          onToCommit={(value) => commitRangeField("priceTo", value)}
        />
      </FilterSection>

      <FilterSection title="Бренд">
        <CheckboxGroup options={BRAND_OPTIONS} values={filters.brands} onToggle={toggleBrand} />
      </FilterSection>

      <FilterSection title="Диагональ экрана">
        <RangeInputs
          fromPlaceholder='От "'
          toPlaceholder='До "'
          fromValue={draftFilters.screenFrom}
          toValue={draftFilters.screenTo}
          onFromChange={(value) => updateDraftRange("screenFrom", value)}
          onToChange={(value) => updateDraftRange("screenTo", value)}
          onFromCommit={(value) => commitRangeField("screenFrom", value)}
          onToCommit={(value) => commitRangeField("screenTo", value)}
        />
      </FilterSection>

      <FilterSection title="Процессор">
        <RadioGroup
          name="processor-filter"
          options={["Любой", ...PROCESSOR_OPTIONS]}
          value={filters.processor || "Любой"}
          onChange={(value) => updateInstantFilter("processor", value === "Любой" ? "" : value)}
        />
      </FilterSection>

      <FilterSection title="ОЗУ">
        <RangeInputs
          fromPlaceholder="От Гб"
          toPlaceholder="До Гб"
          fromValue={draftFilters.ramFrom}
          toValue={draftFilters.ramTo}
          onFromChange={(value) => updateDraftRange("ramFrom", value)}
          onToChange={(value) => updateDraftRange("ramTo", value)}
          onFromCommit={(value) => commitRangeField("ramFrom", value)}
          onToCommit={(value) => commitRangeField("ramTo", value)}
        />
      </FilterSection>

      <FilterSection title="Накопитель">
        <RangeInputs
          fromPlaceholder="От Гб"
          toPlaceholder="До Гб"
          fromValue={draftFilters.storageFrom}
          toValue={draftFilters.storageTo}
          onFromChange={(value) => updateDraftRange("storageFrom", value)}
          onToChange={(value) => updateDraftRange("storageTo", value)}
          onFromCommit={(value) => commitRangeField("storageFrom", value)}
          onToCommit={(value) => commitRangeField("storageTo", value)}
        />
      </FilterSection>

      <FilterSection title="Видеокарта">
        <RadioGroup
          name="gpu-filter"
          options={["Любая", ...GPU_TYPES]}
          value={filters.gpu || "Любая"}
          onChange={(value) => updateInstantFilter("gpu", (value === "Любая" ? "" : value) as FilterState["gpu"])}
        />
      </FilterSection>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-[Inter,sans-serif]">
      <Header isLoggedIn={true} />

      <main className="px-4 sm:px-6 xl:px-[60px] max-w-[1440px] mx-auto py-8 sm:py-10">
        <div className="lg:hidden mb-4 flex items-center justify-between gap-3">
          <Button
            variant={filtersOpen ? "dark" : "outlineMuted"}
            size="md"
            icon={filtersOpen ? <X size={18} /> : <SlidersHorizontal size={18} />}
            iconPosition="right"
            onClick={() => setFiltersOpen((prev) => !prev)}
          >
            Фильтры
          </Button>
          <span className="text-sm text-q-muted">
            Найдено: <span className="text-q-dark font-semibold">{filteredProducts.length}</span>
          </span>
        </div>

        <div className="flex gap-8 xl:gap-10 items-start">
          <aside className="shrink-0 w-[220px] xl:w-[240px] hidden lg:block">{renderFilterPanel()}</aside>

          {filtersOpen && (
            <div className="lg:hidden fixed inset-0 z-40 flex">
              <button
                type="button"
                className="flex-1 bg-black/40"
                onClick={() => setFiltersOpen(false)}
                aria-label="Закрыть фильтры"
              />
              <div className="w-72 bg-white h-full overflow-y-auto p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-medium text-q-dark">Фильтры</h2>
                  <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Закрыть">
                    <X size={20} className="text-q-muted" />
                  </button>
                </div>
                {renderFilterPanel()}
              </div>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="mb-6">
              <InputSearch
                placeholder="Поиск по названию"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onBlur={(e) => commitSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    commitSearch(e.currentTarget.value);
                  }
                }}
                tone="surface"
                radius="input"
                border="muted"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  onAddToCart={() => {}}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-20 text-center flex flex-col items-center gap-4">
                <p className="text-q-muted text-base font-medium">
                  По выбранным фильтрам ничего не найдено
                </p>
                <Button variant="outlineMuted" onClick={clearFilters}>
                  Сбросить фильтры
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
