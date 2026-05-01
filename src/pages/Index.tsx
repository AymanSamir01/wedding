// Ayman & Sagda — Wedding Countdown landing page
import { Heart, Gem, Sparkles } from "lucide-react";
import CountdownCard from "@/components/CountdownCard";
import Petals from "@/components/Petals";
import MusicToggle from "@/components/MusicToggle";

// 🗓️ EDIT EVENT DATES HERE
const EVENTS = [
  {
    title: "Birthday",
    date: new Date("2026-05-21T00:00:00"),
    icon: <Sparkles className="w-10 h-10" strokeWidth={1.5} />,
    accent: "gold" as const,
  },
  {
    title: "Katb Ketab",
    date: new Date("2026-07-24T00:00:00"),
    icon: <Gem className="w-10 h-10" strokeWidth={1.5} />,
    accent: "blush" as const,
  },
  {
    title: "Wedding",
    date: new Date("2026-08-15T00:00:00"),
    icon: <Heart className="w-10 h-10 fill-current" strokeWidth={1.5} />,
    accent: "blush" as const,
  },
];

const Index = () => {
  return (
    <main className="relative min-h-screen w-full px-4 py-12 sm:py-20">
      <Petals />
      <MusicToggle />

      {/* Hero */}
      <header className="text-center mb-14 sm:mb-20 fade-up">
        <p className="tracking-[0.4em] uppercase text-gold mb-4 shimmer">
          Forever Begins
        </p>
        <h1 className="display text-5xl sm:text-7xl md:text-8xl font-semibold leading-tight">
          <span className="text-blush">Ayman</span>
          <span className="text-gold mx-3 sm:mx-5">&amp;</span>
          <span className="text-blush">Sagda</span>
        </h1>
        <div className="flex items-center justify-center gap-3 mt-6">
          <span className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-[hsl(var(--gold))]" />
          <Heart className="w-4 h-4 text-blush fill-current float-anim" />
          <span className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-[hsl(var(--gold))]" />
        </div>
        <p className="mt-6 text-sm sm:text-base text-muted-foreground max-w-md mx-auto px-4">
          Every second brings us closer to forever. Count down with us to our most cherished days.
        </p>
      </header>

      {/* Countdown stack */}
      <section className="flex flex-col gap-8 sm:gap-12 max-w-2xl mx-auto">
        {EVENTS.map((e, i) => (
          <CountdownCard
            key={e.title}
            title={e.title}
            date={e.date}
            icon={e.icon}
            accent={e.accent}
            delay={200 + i * 250}
          />
        ))}
      </section>

      {/* Footer */}
      <footer className="text-center mt-16 sm:mt-24 fade-up" style={{ animationDelay: "1200ms" }}>
        <p className="display text-xl sm:text-2xl text-foreground/80 italic">
          "And of His signs is that He created for you mates from yourselves..."
        </p>
        <p className="mt-3 text-xs tracking-[0.3em] uppercase text-gold">With Love</p>
      </footer>
    </main>
  );
};

export default Index;
