// Background music with autoplay attempt + manual toggle (browsers block autoplay without interaction).
import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";

const TRACK_URL ="/audio.mp3"
const MusicToggle = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(TRACK_URL);
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    // Try autoplay
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));

    // Fallback: start on first user interaction
    const start = () => {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    };
    window.addEventListener("pointerdown", start);
    window.addEventListener("keydown", start);

    return () => {
      audio.pause();
      audio.src = "";
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Mute background music" : "Play background music"}
      className="fixed bottom-5 right-5 z-50 glass-card rounded-full p-3 sm:p-4 hover:scale-110 transition-transform duration-300 shadow-romantic"
    >
      {playing ? (
        <Music className="w-5 h-5 text-blush shimmer" />
      ) : (
        <VolumeX className="w-5 h-5 text-muted-foreground" />
      )}
    </button>
  );
};

export default MusicToggle;
