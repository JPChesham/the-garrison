const LONDON = "Europe/London";

function londonDayKey(value: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: LONDON,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(value);
}

export function heroLiveLabel(event: {
  title: string;
  date: string;
  month: string;
  startsAt: string;
  startTime?: string | null;
}) {
  const title = event.title.replaceAll("\n", " ");
  const timeSuffix = event.startTime ? ` · ${event.startTime}` : "";
  const isTonight =
    londonDayKey(new Date(event.startsAt)) === londonDayKey(new Date());

  if (isTonight) {
    return `Live Tonight — ${title}${timeSuffix}`;
  }

  return `Next Up — ${title} · ${event.date} ${event.month}${timeSuffix}`;
}

export { liveMusicImage } from "./fallbacks";
