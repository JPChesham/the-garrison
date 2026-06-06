import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import {
  getAllLegendSlugs,
  getLegendBySlug,
} from "@/lib/content/legends";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllLegendSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const legend = getLegendBySlug(slug);
  if (!legend) return { title: "Legend Not Found" };

  const name = legend.name.replace("\n", " ");
  return {
    title: `${name} | Garrison Legends`,
    description: legend.bio,
  };
}

export default async function LegendDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const legend = getLegendBySlug(slug);
  if (!legend) notFound();

  const namePlain = legend.name.replace("\n", " ");

  return (
    <>
      <section className="purple-light-section pt-24 pb-12 xl:pb-16">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Legends", href: "/legends" },
              { label: namePlain },
            ]}
          />
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
            <div className="relative aspect-[280/380] max-w-md overflow-hidden rounded-sm">
              <Image
                src={legend.image}
                alt={namePlain}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <h1 className="font-bebas text-[clamp(2.5rem,5vw,4rem)] leading-none whitespace-pre-line text-white">
                {legend.name}
              </h1>
              <p
                className={`mt-2 font-barlow text-sm font-semibold uppercase tracking-widest ${legend.genreClassName}`}
              >
                {legend.genre}
              </p>
              <p className="mt-1 font-barlow text-sm text-charcoal-light">
                {legend.year}
              </p>
              <p className="mt-6 font-barlow text-base leading-relaxed text-white">
                {legend.bio}
              </p>
              <div className="mt-8">
                <Button variant="outline-purple" href="/legends">
                  ← ALL LEGENDS
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
