"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { cn } from "@/lib/utils/cn";
import { navLinks, siteConfig } from "@/lib/navigation";
import { MobileNav } from "./MobileNav";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <header className="fixed top-0 right-0 left-0 z-30 border-b border-charcoal-light bg-charcoal/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 xl:px-12">
          <div className="flex items-center gap-8">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
              aria-label="Open menu"
            >
              <span className="block h-0.5 w-6 bg-white" />
              <span className="block h-0.5 w-4 bg-ember" />
              <span className="block h-0.5 w-6 bg-white" />
            </button>
            <Link
              href="/"
              className="font-bebas text-2xl tracking-widest text-ember"
            >
              {siteConfig.name}
            </Link>
          </div>
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "desktop-nav-link text-lg tracking-widest",
                    isActive && "text-ember",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-4">
            <SocialLinks variant="header" />
          </div>
        </div>
      </header>
    </>
  );
}
