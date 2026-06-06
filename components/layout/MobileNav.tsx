"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect } from "react";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { cn } from "@/lib/utils/cn";
import { mobileNavLinks, siteConfig } from "@/lib/navigation";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNav({ open, onClose }: MobileNavProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/70 lg:hidden",
          open ? "block" : "hidden",
        )}
        onClick={onClose}
        aria-hidden={!open}
      />
      <nav
        className={cn(
          "nav-mobile-slide fixed top-0 left-0 z-50 flex h-full w-72 flex-col bg-charcoal-mid lg:hidden",
          open && "open",
        )}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-charcoal-light p-5">
          <span className="font-bebas text-3xl tracking-wider text-ember">
            {siteConfig.name}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center text-white"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          <ul className="space-y-1">
            {mobileNavLinks.map((link, index) => {
              const Icon = link.icon;
              const isLast = index === mobileNavLinks.length - 1;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 px-3 py-4 font-bebas text-2xl tracking-widest text-white transition-colors hover:text-ember",
                      !isLast && "border-b border-charcoal-light",
                    )}
                  >
                    <Icon className={cn("h-6 w-6", link.iconColor)} />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="border-t border-charcoal-light p-5">
          <p className="font-barlow text-sm text-charcoal-light">
            {siteConfig.addressShort}
          </p>
          <SocialLinks variant="drawer" className="mt-3" />
        </div>
      </nav>
    </>
  );
}
