import {ExclamationTriangleIcon} from "@radix-ui/react-icons";

import {CardWrapper} from "~/auth/components/card-wrapper";

export function ErrorCard() {
  return (
    <CardWrapper
      backButtonHref='/login'
      backButtonLabel=''
      backButtonTrigger='Go back to Login'
      headerLabel='Oops! Something went wrong.'
      headerTitle=''
    >
      <div className='flex w-full items-center justify-center'>
        <ExclamationTriangleIcon className='h-6 w-6 text-destructive' />
      </div>
    </CardWrapper>
  );
}
