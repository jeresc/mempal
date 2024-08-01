"use client";

import {usePathname} from "next/navigation";
import React from "react";

import {ThemeProvider} from "@/modules/theme/context";
import {Toaster} from "@/components/ui/sonner";

interface ThemeHandlerProps {
  children: React.ReactNode;
}

// eslint-disable-next-line react/function-component-definition
const ThemeHandler: React.FC<ThemeHandlerProps> = ({children}) => {
  const pathname = usePathname();

  const lightTheme = [
    "/login",
    "/register",
    "/reset",
    "/new-password",
    "/error",
    "/terms",
    "/pricing",
    "/new-verification",
    "/",
  ];

  const theme = lightTheme.includes(pathname) ? "light" : "dark";

  return (
    <ThemeProvider disableTransitionOnChange enableSystem attribute='class' defaultTheme={theme}>
      <Toaster />
      {children}
    </ThemeProvider>
  );
};

export default ThemeHandler;
