import { ShoppingCart, ImageOff } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
  id: string | number;
  name: string;
  price: number;
  image?: string;
  onAddToCart?: () => void;
}

export function ProductCard({
  id,
  name,
  price,
  image,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="group relative rounded-q-input border border-q-border overflow-hidden bg-white transition-all duration-200 hover:-translate-y-0.5 cursor-pointer flex flex-col">
      <Link href={`/item/${id}`} className="no-underline flex flex-col flex-1">
        {/* Image area */}
        <div className="h-[170px] border-b border-q-border flex items-center justify-center bg-white overflow-hidden shrink-0">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center size-full">
              <ImageOff size={40} className="text-q-border" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 p-4 flex-1">
          <p className="text-q-dark text-[20px] font-medium leading-normal flex-1">
            {name}
          </p>

          <div className="flex items-end justify-between">
            {/* Price */}
            <div className="flex items-end gap-1 leading-[1.08] font-medium whitespace-nowrap">
              <span className="text-q-dark text-2xl">
                {price.toLocaleString("ru-RU")}
              </span>
              <span className="text-q-muted text-[18px]">$</span>
            </div>

            {/* Cart button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onAddToCart?.();
              }}
              className="size-10 rounded-full border border-q-border flex items-center justify-center text-q-dark hover:bg-q-dark hover:text-white hover:border-q-dark transition-all duration-150 active:scale-90 shrink-0"
              aria-label="Добавить в корзину"
            >
              <ShoppingCart size={16} />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
