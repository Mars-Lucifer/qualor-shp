"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, User } from "lucide-react";

import { useAuth } from "@/app/auth-provider";
import { InputSearch } from "./Input";
import { Button } from "./Button";

interface HeaderProps {
  isLoggedIn?: boolean;
  userName?: string;
}

export function Header({
  isLoggedIn = false,
  userName = "Никита",
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, ready, logout } = useAuth();

  const resolvedIsLoggedIn = ready ? Boolean(user) : isLoggedIn;
  const resolvedUserName = user?.name ?? userName;
  const isAdmin = user?.role === "admin";

  const navLinks = [
    { label: "Каталог", href: "/catalog" },
    { label: "Корзина", href: "/basket" },
    { label: "Заказы", href: "/orders" },
    ...(isAdmin ? [{ label: "Админ", href: "/admin" }] : []),
  ];

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    router.push("/");
  };

  return (
    <header className="sticky z-50 isolate top-0 w-full px-4 sm:px-6 xl:px-[60px] py-4 sm:py-5">
      <div className="absolute pointer-events-none z-[-10] h-full sm:h-1/2 top-0 left-4 right-4 sm:left-6 sm:right-6 xl:left-[60px] xl:right-[60px] bg-white" />
      <div className="bg-q-surface rounded-q-input px-4 sm:px-5 py-3.5 flex items-center gap-4 sm:gap-6 xl:gap-10 max-w-[1320px] mx-auto">
        <Link
          href="/"
          className="flex items-center gap-3.5 shrink-0 group no-underline"
        >
          <div className="size-8 shrink-0">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <clipPath id="logo-clip">
                <rect width="32" height="32" fill="white" />
              </clipPath>
              <g clipPath="url(#logo-clip)">
                <path d="M16 0H32V16L16 0Z" fill="#1F2128" />
                <path d="M32 32H16V16L32 32Z" fill="#1F2128" />
                <path d="M0 16H16V32L0 16Z" fill="#1F2128" />
                <rect width="16" height="16" fill="#1F2128" />
              </g>
            </svg>
          </div>
          <span className="text-q-dark font-medium text-2xl leading-normal whitespace-nowrap transition-opacity group-hover:opacity-75">
            Qualor shp
          </span>
        </Link>

        <div className="hidden sm:flex flex-1 min-w-0">
          <InputSearch placeholder="Поиск" tone="white" />
        </div>

        <nav className="hidden md:flex items-center gap-6 xl:gap-10 shrink-0">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={[
                "text-base font-medium leading-normal transition-colors duration-150 no-underline whitespace-nowrap",
                pathname === link.href
                  ? "text-q-dark"
                  : "text-q-muted hover:text-q-dark",
              ].join(" ")}
            >
              {link.label}
            </Link>
          ))}

          {resolvedIsLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link href="/orders" className="no-underline">
                <button className="bg-q-dark text-white rounded-q-pill px-[18px] py-3 text-base font-medium flex items-center gap-2.5 hover:bg-q-dark-soft transition-colors duration-150 whitespace-nowrap cursor-pointer">
                  {resolvedUserName}
                  <User size={18} />
                </button>
              </Link>
              <Button variant="outlineMuted" size="md" onClick={handleLogout}>
                Выйти
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth">
                <Button variant="dark" size="md">
                  Войти
                </Button>
              </Link>
              <Link href="/auth?tab=register">
                <Button variant="accent" size="md">
                  Зарегистрироваться
                </Button>
              </Link>
            </div>
          )}
        </nav>

        <button
          className="md:hidden ml-auto text-q-dark p-1 transition-transform duration-150 active:scale-95"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="sm:hidden mt-2 px-0">
        <InputSearch placeholder="Поиск" tone="white" border="strong" />
      </div>

      <div
        className={[
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out max-w-[1320px] mx-auto",
          menuOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="bg-q-surface rounded-q-input p-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={[
                "text-base font-medium py-2 no-underline transition-colors duration-150",
                pathname === link.href
                  ? "text-q-dark"
                  : "text-q-muted hover:text-q-dark",
              ].join(" ")}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-q-border">
            {resolvedIsLoggedIn ? (
              <>
                <Link href="/orders" onClick={() => setMenuOpen(false)}>
                  <Button variant="dark" fullWidth>
                    {resolvedUserName} <User size={18} />
                  </Button>
                </Link>
                <Button variant="outlineMuted" fullWidth onClick={handleLogout}>
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth" onClick={() => setMenuOpen(false)}>
                  <Button variant="dark" fullWidth>
                    Войти
                  </Button>
                </Link>
                <Link
                  href="/auth?tab=register"
                  onClick={() => setMenuOpen(false)}
                >
                  <Button variant="accent" fullWidth>
                    Зарегистрироваться
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
