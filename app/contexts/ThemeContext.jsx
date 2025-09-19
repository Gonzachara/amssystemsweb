"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from 'prop-types';

const ThemeContext = createContext({
  isDarkMode: true,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const stored = typeof window !== "undefined" ? window.localStorage.getItem("ams-theme") : null;
      if (stored === "light" || stored === "dark") {
        const isDark = stored === "dark";
        setIsDarkMode(isDark);
        document.documentElement.classList.toggle('light-mode', !isDark);
      } else {
        // Default to dark mode if no preference stored
        setIsDarkMode(true);
        document.documentElement.classList.remove('light-mode');
      }
    } catch {
      // Fallback to dark mode
      setIsDarkMode(true);
      document.documentElement.classList.remove('light-mode');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      try {
        window.localStorage.setItem("ams-theme", newMode ? "dark" : "light");
      } catch {}
      return newMode;
    });
  };

  // Apply class to <html> whenever the mode changes
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (isDarkMode) {
        document.documentElement.classList.remove('light-mode');
      } else {
        document.documentElement.classList.add('light-mode');
      }
    }
  }, [isDarkMode]);

  const value = useMemo(() => ({
    isDarkMode,
    toggleTheme,
    mounted,
  }), [isDarkMode, mounted]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
