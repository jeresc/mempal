"use client";
import {useEffect} from "react";

import {useSubscription} from "~/subscription/hooks/use-subscription";

function SubscriptionProvider({children}: {children: React.ReactNode}) {
  const {subscription} = useSubscription();

  useEffect(() => {
    console.log(subscription);
  }, [subscription]);

  return <>{children}</>;
}

export {SubscriptionProvider};
