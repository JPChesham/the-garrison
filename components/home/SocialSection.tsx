import Image from "next/image";
import Link from "next/link";
import { InstagramIcon } from "@/components/icons/SocialIcons";
import { Container } from "@/components/ui/Container";
import { socialImages } from "@/lib/content/home";
import { siteConfig } from "@/lib/navigation";

export function SocialSection() {
  return (
    <section id="social" className="bg-charcoal-mid py-16 xl:py-20">
      <Container>
        <div className="mb-10 text-center">
          <p className="mb-2 font-barlow text-xs font-extrabold uppercase tracking-widest text-charcoal-light">
            — TAG US
          </p>
          <h2
            className="font-bebas text-white"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            #THEGARRISON
          </h2>
        </div>
        <div className="mb-8 grid grid-cols-3 gap-3 md:grid-cols-6">
          {socialImages.map((image) => (
            <div
              key={image.src}
              className={`h-40 overflow-hidden rounded-sm ${image.colSpan}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={160}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Link
            href={siteConfig.instagram}
            className="flex items-center gap-3 rounded-sm border border-charcoal-light px-6 py-3 font-barlow text-base font-bold text-white transition-colors hover:border-ember hover:text-ember"
          >
            <InstagramIcon className="h-5 w-5" />
            {siteConfig.instagramHandle}
          </Link>
        </div>
      </Container>
    </section>
  );
}
