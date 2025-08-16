import { useCallback, useEffect, useRef, useState } from "react";

export const useModalVisibility = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    document.body.style.overflow = "unset";
    setIsOpen(false);
    previouslyFocusedRef.current?.focus?.();
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return { isOpen, open, close };
};


