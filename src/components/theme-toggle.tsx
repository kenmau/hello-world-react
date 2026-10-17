"use client";

import { Moon, Sun } from "lucide-react";
import { useLayoutEffect, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import {
  THEME_STORAGE_KEY,
  applyTheme,
  persistTheme,
  readStoredTheme,
  resolveTheme,
  type Theme,
} from "@/lib/theme";

const THEME_CHANGE_EVENT = "theme-change";

function subscribe(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  const onPreferenceChange = () => {
    if (readStoredTheme()) return;
    onStoreChange();
  };

  const onStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY) return;
    onStoreChange();
  };

  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", onStorage);
  media.addEventListener("change", onPreferenceChange);
  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStorage);
    media.removeEventListener("change", onPreferenceChange);
  };
}

function getSnapshot(): Theme {
  return resolveTheme();
}

function getServerSnapshot(): Theme | null {
  return null;
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useLayoutEffect(() => {
    applyTheme(theme ?? resolveTheme());
  }, [theme]);

  function toggleTheme() {
    const next: Theme = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";
    applyTheme(next);
    persistTheme(next);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }

  const label =
    theme === "dark"
      ? "Switch to light mode"
      : theme === "light"
        ? "Switch to dark mode"
        : "Switch between light and dark mode";

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="size-11 bg-transparent"
      aria-label={label}
      onClick={toggleTheme}
    >
      <span className="relative block size-4">
        <Moon className="theme-icon-moon absolute inset-0" aria-hidden="true" />
        <Sun className="theme-icon-sun absolute inset-0" aria-hidden="true" />
      </span>
    </Button>
  );
}
