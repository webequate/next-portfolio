"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitioning, setTransitioning] = useState(false);
  const previousPathname = useRef(pathname);

  useEffect(() => {
    // Only transition if pathname actually changed
    if (pathname !== previousPathname.current) {
      setTransitioning(true);

      // Wait for fade out, then update content and fade in
      const timer = setTimeout(() => {
        setDisplayChildren(children);
        setTransitioning(false);
      }, 200); // Half of transition duration for fade out

      previousPathname.current = pathname;

      return () => clearTimeout(timer);
    } else {
      // Initial render, no transition
      setDisplayChildren(children);
    }
  }, [pathname, children]);

  return (
    <div className={`page-transition ${transitioning ? "fade-out" : ""}`}>
      {displayChildren}
    </div>
  );
}
