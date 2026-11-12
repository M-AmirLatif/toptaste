"use client";

import { useEffect } from "react";

let activeLocksCount = 0;
let originalOverflow = "";
let originalPaddingRight = "";

/**
 * Locks background body scrolling when a drawer, menu, or modal is active.
 * Prevents scroll bleeding / bounce to the main webpage beneath.
 */
export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked || typeof document === "undefined") return;

    if (activeLocksCount === 0) {
      originalOverflow = document.body.style.overflow;
      originalPaddingRight = document.body.style.paddingRight;

      // Compensate for scrollbar disappearing on desktop to avoid layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      document.body.style.overflow = "hidden";
    }
    activeLocksCount++;

    return () => {
      activeLocksCount--;
      if (activeLocksCount <= 0) {
        activeLocksCount = 0;
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      }
    };
  }, [isLocked]);
}
