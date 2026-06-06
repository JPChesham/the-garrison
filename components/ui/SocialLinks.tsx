import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import {
  FacebookIcon,
  InstagramIcon,
  // TikTokIcon,
} from "@/components/icons/SocialIcons";
import { siteConfig } from "@/lib/navigation";

type SocialIcon = typeof InstagramIcon;

const links: { href: string; icon: SocialIcon; label: string }[] = [
  { href: siteConfig.instagram, icon: InstagramIcon, label: "Instagram" },
  { href: siteConfig.facebook, icon: FacebookIcon, label: "Facebook" },
  // { href: siteConfig.tiktok, icon: TikTokIcon, label: "TikTok" },
];

type SocialLinksProps = {
  variant?: "header" | "drawer" | "footer";
  className?: string;
};

export function SocialLinks({
  variant = "header",
  className,
}: SocialLinksProps) {
  if (variant === "footer") {
    return (
      <div className={cn("flex gap-4", className)}>
        {links.map(({ href, icon: Icon, label }) => (
          <Link
            key={label}
            href={href}
            aria-label={label}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal-light bg-charcoal text-white transition-colors hover:border-ember hover:text-ember"
          >
            <Icon className="h-4 w-4" />
          </Link>
        ))}
      </div>
    );
  }

  if (variant === "drawer") {
    return (
      <div className={cn("flex gap-4", className)}>
        {links.map(({ href, icon: Icon, label }) => (
          <Link
            key={label}
            href={href}
            aria-label={label}
            className="text-white transition-colors hover:text-ember"
          >
            <Icon className="h-5 w-5" />
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("hidden items-center gap-3 lg:flex", className)}>
      {links.map(({ href, icon: Icon, label }) => (
        <Link
          key={label}
          href={href}
          aria-label={label}
          className="text-charcoal-light transition-colors hover:text-ember"
        >
          <Icon className="h-4 w-4" />
        </Link>
      ))}
    </div>
  );
}
