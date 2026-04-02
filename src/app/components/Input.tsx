import React from 'react';
import { Search } from 'lucide-react';

// Input type 1: Gray background (used in auth page)
interface InputGrayProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function InputGray({ className = '', ...props }: InputGrayProps) {
  return (
    <input
      className={[
        'w-full bg-[#F5F5F5] rounded-[14px] px-4 py-3 text-base font-medium',
        'text-[#1F2128] placeholder:text-[#7E8395]',
        'outline-none focus:ring-2 focus:ring-[#1F2128]/20 transition-all duration-150',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  );
}

// Input type 2: White background with border (used in basket/checkout)
interface InputWhiteProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function InputWhite({ className = '', ...props }: InputWhiteProps) {
  return (
    <input
      className={[
        'w-full bg-white border border-[#D6D6DB] rounded-[14px] px-4 py-3 text-base font-medium',
        'text-[#1F2128] placeholder:text-[#7E8395]',
        'outline-none focus:ring-2 focus:ring-[#1F2128]/20 focus:border-[#1F2128] transition-all duration-150',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  );
}

// Input type 3: Search input (rounded full, used in header)
interface InputSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function InputSearch({ className = '', ...props }: InputSearchProps) {
  return (
    <div className="relative flex-1 min-w-0">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7E8395] pointer-events-none"
      />
      <input
        className={[
          'w-full bg-white rounded-full pl-10 pr-4 py-3 text-base font-medium',
          'text-[#1F2128] placeholder:text-[#7E8395]',
          'outline-none focus:ring-2 focus:ring-[#1F2128]/10 transition-all duration-150',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />
    </div>
  );
}
