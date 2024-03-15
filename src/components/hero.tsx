import {WaitlistForm} from "@/components/waitlist";

export function Hero() {
  return (
    <section className="flex h-full flex-col items-center justify-center gap-4 text-center">
      <h1 className="rn-clr-content-primary my-0 max-w-[370px] text-[54px] font-bold leading-[106%] tracking-tight text-black xl:text-6xl xl:text-[48px]">
        Unlock your true potential
      </h1>
      <sub className="my-0 mb-0 text-xl leading-7 text-gray-400 lg:pr-8 xl:text-2xl">
        Supercharge your learning with our intelligent study platform. Generate personalized
        questions and flashcards directly from your resources.
      </sub>
      <WaitlistForm />
    </section>
  );
}
