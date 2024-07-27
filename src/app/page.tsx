import {Hero} from "~/landing/components/hero";
import {About} from "~/landing/components/about";
import {Features} from "~/landing/components/features";

import {Header} from "@/components/ui/header";
import {GradientBackground} from "@/modules/landing/components/gradient-background";
import { Footer } from "@/components/ui/footer";

export default function HomePage() {
  return (
    <div className='flex h-full w-full flex-col items-center'>
      <Header />
      <main className='w-full max-w-7xl px-4 py-12 sm:px-8'>
        <Hero />
        <GradientBackground />
        <div className='min-h-screen'>
          <About />
          <Features />
        </div>
        <Footer />
        {/* <footer className='h-fit px-2 text-center leading-[4rem] opacity-70'>
          © {new Date().getFullYear()} Mempal
        </footer> */}
      </main>
    </div>
  );
}
