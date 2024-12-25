"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { navItems } from "~/config/nav";
import { useIsMobile } from "~/hooks/use-mobile";
import { cn } from "~/lib/utils";

export function Sider() {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!isMobile) return;

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > lastScrollY);
      lastScrollY = currentScrollY;
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <aside
      className={cn(
        "group z-50 flex h-auto w-full flex-col items-center justify-center bg-secondary py-3 transition-all duration-300",
        "fixed bottom-0 left-0 top-[unset] lg:bottom-[unset] lg:top-0 lg:h-screen lg:w-20 lg:bg-transparent",
        "py-4 lg:py-0",
        isMobile && isScrolled ? "translate-y-14" : "translate-y-0",
      )}
    >
      {!isMobile && (
        <Image
          src="/logo.png"
          alt="Dodycode Logo"
          className="absolute top-5 z-50 scale-75 brightness-0 invert"
          width={100}
          height={100}
          unoptimized
        />
      )}
      {!isMobile && <div className="bg-disney-sidenav-backdrop" />}
      <nav className="relative z-50 flex w-full items-center justify-evenly gap-8 lg:w-auto lg:flex-col lg:justify-start">
        {navItems.map((item) => {
          const isActive = item.href === pathname;

          return (
            <Link
              className={cn(
                "cursor-pointer text-muted-foreground hover:text-white",
                "relative flex items-center gap-4",
                isActive && "text-white",
              )}
              key={item.href}
              href={item.href}
            >
              {item.icon && <item.icon className="h-6 w-6" />}
              <span className="absolute left-10 hidden w-[100px] -translate-x-2 transform text-lg opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100 lg:block">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
