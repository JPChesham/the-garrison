type MarqueeProps = {
  items: string[];
};

export function Marquee({ items }: MarqueeProps) {
  const content = items.flatMap((item, i) => [
    <span
      key={`a-${i}`}
      className="px-4 font-bebas text-lg tracking-widest text-white"
    >
      {item}
    </span>,
    <span key={`sep-a-${i}`} className="px-2 text-white opacity-50">
      ★
    </span>,
  ]);

  return (
    <div className="overflow-hidden bg-ember py-3">
      <div
        className="marquee-track flex w-max items-center gap-0 whitespace-nowrap"
        aria-hidden="true"
      >
        {content}
        {content}
      </div>
    </div>
  );
}
