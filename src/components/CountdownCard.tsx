// Single countdown card — title, icon, live timer. Hides itself when target reached.
import { useEffect, useState, type ReactNode } from "react";

interface CountdownCardProps {
  title: string;
  date: Date;
  icon: ReactNode;
  delay?: number;
  accent?: "blush" | "gold" | "rose";
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

const calc = (target: Date): TimeLeft => {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: false,
  };
};

const pad = (n: number) => n.toString().padStart(2, "0");

const Unit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center min-w-[64px] sm:min-w-[80px]">
    <div
      key={value}
      className="countdown-num glass-card rounded-2xl px-3 py-3 sm:px-5 sm:py-4 text-3xl sm:text-5xl font-semibold text-blush tabular-nums"
    >
      {pad(value)}
    </div>
    <span className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
      {label}
    </span>
  </div>
);

const CountdownCard = ({ title, date, icon, delay = 0, accent = "blush" }: CountdownCardProps) => {
  const [time, setTime] = useState<TimeLeft>(() => calc(date));
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTime(calc(date)), 1000);
    return () => clearInterval(id);
  }, [date]);

  useEffect(() => {
    if (time.done && !hidden) {
      // smooth fade-out then unmount
      const t = setTimeout(() => setHidden(true), 900);
      return () => clearTimeout(t);
    }
  }, [time.done, hidden]);

  if (hidden) return null;

  const formattedDate = date.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article
      className="fade-up glass-card rounded-[2rem] p-6 sm:p-10 w-full max-w-2xl mx-auto transition-all duration-500 hover:-translate-y-2 hover:shadow-glow-romantic"
      style={{
        animationDelay: `${delay}ms`,
        opacity: time.done ? 0 : undefined,
        transform: time.done ? "translateY(20px) scale(0.96)" : undefined,
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      <header className="flex flex-col items-center text-center mb-6">
        <div
          className={`float-anim mb-3 text-4xl sm:text-5xl ${
            accent === "gold" ? "text-gold" : "text-blush"
          }`}
        >
          {icon}
        </div>
        <h2 className="display text-3xl sm:text-4xl font-semibold text-foreground">
          {title}
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-muted-foreground tracking-wider">
          {formattedDate}
        </p>
      </header>

      <div className="flex justify-center gap-2 sm:gap-4">
        <Unit value={time.days} label="Days" />
        <Unit value={time.hours} label="Hours" />
        <Unit value={time.minutes} label="Minutes" />
        <Unit value={time.seconds} label="Seconds" />
      </div>
    </article>
  );
};

export default CountdownCard;
