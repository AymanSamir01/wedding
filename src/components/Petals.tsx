// Soft falling petals background animation
import { useMemo } from "react";

const Petals = () => {
  const petals = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 12 + Math.random() * 10,
        size: 0.8 + Math.random() * 1.2,
        emoji: ["🌸", "🌷", "✿", "❀"][i % 4],
      })),
    []
  );

  return (
    <div className="romantic-bg" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            fontSize: `${p.size}rem`,
            color: "hsl(345 70% 75%)",
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
};

export default Petals;
