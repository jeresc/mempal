import {cn} from "@/lib/utils/cn";
import {Skeleton} from "@/components/ui/skeleton";

const tabs = ["chat", "deck"];

const randomWidthBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

function DocumentItemSkeleton() {
  return (
    <div className='flex flex-col gap-0.5'>
      <span
        className={cn(
          "group/item flex w-full items-center gap-2.5 rounded-md p-2 text-sm font-medium ",
        )}
      >
        <div className='flex h-full w-full items-center justify-start gap-2'>
          <Skeleton className='h-4 w-4' />

          <Skeleton className='h-4 ' style={{width: `${randomWidthBetween(60, 85)}%`}} />
        </div>
      </span>
      <ul className='flex flex-col gap-0.5'>
        {tabs.map((tab) => (
          <li
            key={tab}
            className={cn(
              "hidden w-full items-center gap-2.5 rounded-md py-1.5 pr-2 text-sm font-medium",
            )}
          >
            <div>
              <Skeleton className='h-4 w-4' />
              <Skeleton className='h-4 w-[60%]' />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export {DocumentItemSkeleton};
