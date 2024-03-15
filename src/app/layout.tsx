import type {Metadata} from "next";

import {Outfit} from "next/font/google";

import "./globals.css";
import {Logo} from "@/assets/logo";

const outfit = Outfit({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "mempal-web",
  description: "Mempal is your next study friend for memorizing.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({children}: RootLayoutProps) {
  return (
    <html className={outfit.className} lang="en">
      <body className="bg-background dark container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] antialiased">
        <header className="flex items-center justify-between p-2 text-xl font-bold leading-[4rem]">
          <Logo className="h-8" />
          {/* <nav> */}
          {/*   <ul className="flex gap-2"> */}
          {/*     <li> */}
          {/*       <a href="/">Home</a> */}
          {/*     </li> */}
          {/*     <li> */}
          {/*       <a href="/cards">Cards</a> */}
          {/*     </li> */}
          {/*   </ul> */}
          {/* </nav> */}
        </header>
        <main className="h-full px-4 py-8">
          {children}
          <div className="absolute left-0 top-0 -z-10 h-full w-full overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            >
              <div
                className="to-primary-muted relative left-[calc(50%)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-600 opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            >
              <div
                className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-blue-600 to-orange-800 opacity-40 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
        </main>
        <footer className="px-2 text-center leading-[4rem] opacity-70">
          © {new Date().getFullYear()} mempal-web
        </footer>
      </body>
    </html>
  );
}
