"use client";

import {useTheme} from "next-themes";
import {useEffect} from "react";

function ThemeWrapper({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: "light" | "dark" | "system";
}) {
  const {setTheme} = useTheme();

  useEffect(() => {
    setTheme(theme);
  }, [setTheme, theme]);

  return <>{children}</>;
}

export {ThemeWrapper};
