import {useQuery} from "@tanstack/react-query";

import {useCurrentUser} from "~/auth/hooks/use-current-user";
import {getSubscription} from "~/subscription/api";

const useSubscription = () => {
  const user = useCurrentUser();

  const userId = user?.id;

  const queryFn = async () => {
    const subscriptionResult = await getSubscription();

    if (subscriptionResult.error) throw subscriptionResult.error;

    return subscriptionResult.success.subscription;
  };

  const {data, isPending, error} = useQuery({
    queryKey: ["subscriptions", userId],
    queryFn,
    staleTime: 10 * 60 * 1000,
    enabled: !!userId,
  });

  const subscription = data ?? null;

  return {
    subscription,
    isPending,
    error,
  };
};

export {useSubscription};
