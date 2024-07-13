import {Hero} from "~/home/components/hero";

import {GradientBackground} from "@/modules/home/components/gradient-background";

export default function HomePage() {
  return (
    <>
      <Hero />
      <GradientBackground />
      <div className='min-h-screen' />
    </>
  );
}
