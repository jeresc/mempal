import {motion} from "framer-motion";

import {Skeleton} from "@/components/ui/skeleton";
import {cn} from "@/lib/utils/cn";

function GeneratedFlashcard({
  question,
  answer,
  topic,
}: {
  question?: string;
  answer?: string;
  topic?: string;
}) {
  return (
    <motion.div
      className={cn(
        "flex min-h-[146px] flex-col justify-between gap-2 rounded-md border border-border p-4 transition-all duration-300",
      )}
    >
      {question !== undefined ? <h3>{question}</h3> : <Skeleton className='h-4 w-[72%]' />}
      {answer !== undefined ? (
        <p className='min-h-12 self-start'>{answer}</p>
      ) : (
        <div className='flex flex-col gap-1'>
          <Skeleton className='h-5 w-[87%]' />
          <Skeleton className='h-5 w-[59%]' />
        </div>
      )}
      {topic?.length !== undefined ? <p>{topic}</p> : <Skeleton className='h-4 w-36' />}
    </motion.div>
  );
}

export {GeneratedFlashcard};
