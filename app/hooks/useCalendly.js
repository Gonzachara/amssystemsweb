"use client";

import { useState, useCallback } from "react";

export const useCalendly = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openCalendly = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeCalendly = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    openCalendly,
    closeCalendly
  };
};
