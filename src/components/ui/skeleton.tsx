import {cn} from "@/lib/utils";

const generateRandomWidth = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

function Skeleton({
  className,
  randomWidth,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {randomWidth?: [number, number]}) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
      {...(randomWidth && {style: {width: `${generateRandomWidth(...randomWidth)}%`}})}
    />
  );
}

export {Skeleton};
