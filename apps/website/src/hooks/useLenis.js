import { useEffect } from "react";
import Lenis from "lenis";

export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,

      easing: (t) =>
        Math.min(1, 1.001 - Math.pow(2, -10 * t)),

      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
    });

    let frameId;

    const raf = (time) => {
      lenis.raf(time);

      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);

      lenis.destroy();
    };
  }, []);
}