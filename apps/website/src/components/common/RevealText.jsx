import { useEffect, useRef } from "react";

import { getGsap } from "../../lib/gsap";
import useReducedMotion from "../../hooks/useReducedMotion";

export default function RevealText({
  children,
  className = "",
  as: Component = "div",
}) {
  const elementRef = useRef(null);

  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (
      reducedMotion ||
      !elementRef.current
    ) {
      return undefined;
    }

    const { gsap } = getGsap();

    const context = gsap.context(() => {
      gsap.fromTo(
        elementRef.current,
        {
          yPercent: 18,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,

          duration: 1.2,

          ease: "power4.out",

          scrollTrigger: {
            trigger: elementRef.current,
            start: "top 88%",
            once: true,
          },
        },
      );
    }, elementRef);

    return () => {
      context.revert();
    };
  }, [reducedMotion]);

  return (
    <Component
      ref={elementRef}
      className={className}
    >
      {children}
    </Component>
  );
}