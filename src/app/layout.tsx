import type {Metadata} from "next";

import {Inter} from "next/font/google";
import {Outfit} from "next/font/google";
import "./globals.css";
import {SessionProvider} from "next-auth/react";

import {Toaster} from "@/components/ui/toaster";
import {cn} from "@/lib/utils";
import {auth} from "@/auth";
import {ThemeProvider} from "@/modules/theme/context";
import ReactQueryProvider from "@/components/providers/react-query-provider";

const outfit = Outfit({subsets: ["latin"], variable: "--font-outfit"});

const inter = Inter({subsets: ["latin"], variable: "--font-inter", weight: ["500", "600", "700"]});

export const metadata: Metadata = {
  title: "Mempal - Supercharge your learning experience with our intelligent study platform.",
  description:
    "Mempal: Boost Your Learning with AI-Generated Flashcards. Create custom study materials from any resource for efficient, personalized learning.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
    192: "/android-chrome-192x192.png",
    512: "/android-chrome-512x512.png",
  },
  openGraph: {
    title: "Mempal",
    description:
      "Mempal: Boost Your Learning with AI-Generated Flashcards. Create custom study materials from any resource for efficient, personalized learning.",
    type: "website",
    images: [
      {
        url: "",
        width: 0,
        height: 0,
        alt: "",
        type: "image/jpeg",
      },
    ],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({children}: RootLayoutProps) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html
        suppressHydrationWarning
        className={cn(inter.variable, outfit.variable, "font-inter")}
        lang='en'
      >
        <body className='m-auto grid h-full min-h-screen w-full grid-rows-[1fr,auto] antialiased'>
          <ReactQueryProvider>
            <ThemeProvider
              disableTransitionOnChange
              enableSystem
              attribute='class'
              defaultTheme='system'
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </ReactQueryProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
