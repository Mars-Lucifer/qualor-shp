import React from 'react';

type ButtonVariant = 'dark' | 'accent' | 'outline' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  as?: 'button' | 'a';
  href?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  dark: 'bg-[#1F2128] text-white hover:bg-[#2d3140] active:scale-95',
  accent: 'bg-[#D6FF33] text-[#1F2128] hover:bg-[#c8f020] active:scale-95',
  outline: 'border border-[#1F2128] text-[#1F2128] bg-transparent hover:bg-[#1F2128] hover:text-white active:scale-95',
  danger: 'bg-[#FF3333] text-white hover:bg-[#e62020] active:scale-95',
  ghost: 'bg-[#F5F5F5] text-[#1F2128] hover:bg-[#ebebeb] active:scale-95',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-[18px] py-3 text-base',
};

export function Button({
  variant = 'dark',
  size = 'md',
  icon,
  iconPosition = 'right',
  fullWidth = false,
  children,
  className = '',
  as: Tag = 'button',
  href,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2.5 rounded-full font-medium leading-normal transition-all duration-150 cursor-pointer shrink-0 whitespace-nowrap select-none';

  const classes = [
    base,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (Tag === 'a' && href) {
    return (
      <a href={href} className={classes}>
        {icon && iconPosition === 'left' && icon}
        {children}
        {icon && iconPosition === 'right' && icon}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </button>
  );
}
