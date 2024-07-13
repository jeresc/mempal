import {ExclamationTriangleIcon} from "@radix-ui/react-icons";

import {cn} from "@/lib/utils";

interface FormErrorProps {
  message?: string;
  className?: string;
}

export function FormError({message, className}: FormErrorProps) {
  if (!message) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-x-2 rounded-md bg-red-100 p-3 text-sm text-destructive dark:bg-destructive/45 dark:text-red-300",
        className,
      )}
    >
      <ExclamationTriangleIcon className='h-4 w-4' />
      <p>{message}</p>
    </div>
  );
}
