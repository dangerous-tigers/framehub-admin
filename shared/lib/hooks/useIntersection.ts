"use client";
import { useCallback, useEffect, useRef } from "react";

export function useIntersection(onIntersect: () => void) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    return () => observerRef.current?.disconnect();
  }, []);

  return useCallback(
    (el: HTMLDivElement | null) => {
      observerRef.current?.disconnect();

      if (!el) {
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              onIntersect();
            }
          });
        },
        { threshold: 1 },
      );

      observer.observe(el);
      observerRef.current = observer;
    },
    [onIntersect],
  );
}
