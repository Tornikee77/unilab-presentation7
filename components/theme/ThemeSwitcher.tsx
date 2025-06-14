"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import ThemeSwitcherSelect from "./ThemeSwitcherSelect";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const isLight = resolvedTheme === "light";

  return <ThemeSwitcherSelect isLight={isLight} setTheme={setTheme} />;
}
