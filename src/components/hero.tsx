import {WaitlistForm} from "@/components/waitlist";

export function Hero() {
  return (
    <section className="grid grid-cols-1 place-items-stretch gap-4 gap-y-12 md:grid-cols-2">
      <section className="flex h-full max-w-xl flex-col items-center justify-center gap-3 text-center md:items-start md:gap-4 md:text-left">
        <h1 className="rn-clr-content-primary my-0 text-4xl font-bold leading-[106%] tracking-tight text-black xl:text-6xl xl:text-[48px]">
          Unlock your true potential
        </h1>
        <sub className="my-0 mb-0 text-lg leading-6 text-gray-400 md:pr-8 xl:text-2xl">
          Supercharge your learning with our intelligent study platform. Generate personalized
          questions and flashcards directly from your resources.
        </sub>
        <WaitlistForm />
      </section>
      <article className="aspect-video w-full rounded-lg border border-blue-50 bg-[rgb(255,255,255,.5)]" />
    </section>
  );
}
