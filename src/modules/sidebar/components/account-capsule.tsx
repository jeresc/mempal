"use client";

import {Suspense} from "react";

import {GradientAvatar} from "~/sidebar/components/gradient-avatar";
import {useCurrentUser} from "~/auth/hooks/use-current-user";

import {AccountDropdown} from "./account-dropdown";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Skeleton} from "@/components/ui/skeleton";

function AccountCapsule() {
  const user = useCurrentUser();

  return user == null ? (
    <div className='flex cursor-pointer items-center gap-2 rounded-md p-2 transition-all duration-75 hover:bg-foreground/[7%]'>
      <Skeleton className='h-6 w-6 rounded-full' />
      <Skeleton className='h-4 w-[120px] rounded-md' />
    </div>
  ) : (
    <AccountDropdown>
      <div className='flex cursor-pointer items-center gap-2 rounded-md p-2 transition-all duration-75 hover:bg-foreground/[7%]'>
        <Suspense>
          <Avatar className='h-6 w-6 rounded-full'>
            <AvatarImage className='h-full w-full rounded-full' src={user?.image || ""} />
            <AvatarFallback>
              {user?.id?.length !== undefined && <GradientAvatar size={20} userId={user.id} />}
            </AvatarFallback>
          </Avatar>
        </Suspense>
        <h2 className='text-semibold text-foreground'>{user?.name}</h2>
      </div>
    </AccountDropdown>
  );
}

export {AccountCapsule};
