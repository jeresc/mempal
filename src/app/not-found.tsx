import React from "react";

import {GradientBackground} from "~/home/components/gradient-background";

export default function NotFoundPage() {
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <GradientBackground />
      <h2 className='text-4xl font-bold'>404</h2>
    </div>
  );
}
