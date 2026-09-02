import {
  Beer,
  CalendarDays,
  MapPin,
  Star,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import type { SiteConfig } from "@/lib/content/types";
import { defaultSiteConfig } from "@/lib/content/fallbacks";

export type { SiteConfig };

export const navLinks = [
  {
    href: "/events",
    label: "WHAT'S ON",
    homeSection: "#events",
  },
  {
    href: "/sport",
    label: "SPORT",
    homeSection: "#sport",
  },
  {
    href: "/#drinks",
    label: "DRINKS",
    homeSection: "#drinks",
  },
  {
    href: "/legends",
    label: "LEGENDS",
    homeSection: "#legends",
  },
  {
    href: "/#community",
    label: "FIND US",
    homeSection: "#community",
  },
] as const;

export type NavRoute = (typeof navLinks)[number]["href"];

export type NavLink = {
  href: string;
  label: string;
  icon: LucideIcon;
  iconColor: string;
  homeSection?: string;
};

const iconMap: Record<string, { icon: LucideIcon; iconColor: string }> = {
  "/events": { icon: CalendarDays, iconColor: "text-ember" },
  "/sport": { icon: Trophy, iconColor: "text-electric" },
  "/#drinks": { icon: Beer, iconColor: "text-amber" },
  "/legends": { icon: Star, iconColor: "text-purple-light" },
  "/#community": { icon: MapPin, iconColor: "text-purple-light" },
};

export const mobileNavLinks: NavLink[] = navLinks.map((link) => ({
  ...link,
  ...iconMap[link.href],
}));

export const footerNavLinks = [
  { href: "/events", label: "What's On" },
  { href: "/sport", label: "Sport Fixtures" },
  { href: "/#drinks", label: "Drinks" },
  { href: "/legends", label: "Garrison Legends" },
  { href: "/#community", label: "Find Us" },
];

export const legalLinks = [{ href: "/privacy", label: "Privacy Policy" }];

/** @deprecated Prefer getSiteSettings().siteConfig — kept as sync fallback for client components */
export const siteConfig: SiteConfig = defaultSiteConfig;
