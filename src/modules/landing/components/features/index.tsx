"use client";

import {TrainAICard, InstantAnswer, PersonalData, InstantReview} from "@/utils/features/features";

function Features() {
  return (
    <div
      className='flex flex-col items-center justify-center gap-y-12 py-8'
    >
      <TrainAICard />
      <InstantAnswer />
      <PersonalData />
      <InstantReview />
    </div>
  );
}

export {Features};
