/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-enable @typescript-eslint/ban-ts-comment */

"use client";

import * as React from "react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {type ThemeProviderProps} from "next-themes/dist/types";

export function ThemeProvider({children, ...props}: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
