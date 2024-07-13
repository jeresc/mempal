import type {Metadata} from "next";

import {Inter} from "next/font/google";
import {Outfit} from "next/font/google";
import "./globals.css";
import {SessionProvider} from "next-auth/react";

import {Header} from "@/components/ui/header";
import {Toaster} from "@/components/ui/sonner";
import {cn} from "@/lib/utils";
import {auth} from "@/auth";
import {ThemeProvider} from "@/modules/theme/context";

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
      <html className={cn(inter.variable, outfit.variable, "font-inter")} lang='en'>
        <body className='m-auto grid min-h-screen max-w-7xl grid-rows-[auto,1fr,auto] px-4 antialiased lg:px-8'>
          <ThemeProvider
            disableTransitionOnChange
            enableSystem
            attribute='class'
            defaultTheme='light'
          >
            <Header />
            <main className='h-full py-12'>{children}</main>
            <Toaster />
            <footer className='px-2 text-center leading-[4rem] opacity-70'>
              © {new Date().getFullYear()} mempal-web
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
