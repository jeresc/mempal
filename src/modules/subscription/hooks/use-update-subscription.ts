import {useMutation, useQueryClient} from "@tanstack/react-query";

import {useCurrentUser} from "~/auth/hooks/use-current-user";

import {patchSubscription} from "../api";
import {Subscription} from "../types";

const useUpdateSubscription = () => {
  const user = useCurrentUser();

  const userId = user?.id;

  const queryClient = useQueryClient();

  const mutationFn = async ({data}: {data: Partial<Omit<Subscription, "id" | "createdAt">>}) => {
    const newDocument = await patchSubscription(data);

    if (newDocument.error) throw newDocument.error;

    return newDocument.success.subscription;
  };

  const {mutate, isPending: isMutating} = useMutation({
    mutationFn,
    onMutate: async ({data: newData}) => {
      await Promise.all([queryClient.cancelQueries({queryKey: ["subscription", userId]})]);

      const oldSubscription = queryClient.getQueryData(["subscriptions", userId]);

      if (oldSubscription === undefined) return;

      const updatedSubscription = {...oldSubscription, ...newData};

      await queryClient.setQueryData(
        ["subscriptions", userId],
        (oldSubscription?: Subscription) => {
          if (oldSubscription === undefined) return updatedSubscription;

          return {...oldSubscription, ...updatedSubscription};
        },
      );

      return {oldSubscription};
    },
    onSuccess: (_data) => {},
    onError: (_error, _, context) => {
      if (context?.oldSubscription != null)
        queryClient.setQueryData(["subscriptions", userId], context?.oldSubscription);
    },
    onSettled: async () => {
      queryClient.invalidateQueries({queryKey: ["subscriptions", userId]});
    },
  });

  return {mutate, isMutating};
};

export {useUpdateSubscription};
