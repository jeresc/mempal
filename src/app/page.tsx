import {Hero} from "~/landing/components/hero";
import {Header} from "@/components/ui/header";
import {GradientBackground} from "@/modules/landing/components/gradient-background";
import { About } from "~/landing/components/about";
import { Features } from "~/landing/components/features";

export default function HomePage() {
  return (
    <div className='h-full w-full flex flex-col items-center'>
      <Header />
      <main className='w-full max-w-7xl px-4 sm:px-8 py-12'>
        <Hero />
        <GradientBackground />
        <div className='min-h-screen'>
            <About />
            <Features />
        </div>
        <footer className='h-fit px-2 text-center leading-[4rem] opacity-70'>
          © {new Date().getFullYear()} Mempal
        </footer>
      </main>
    </div>
  );
}
