import {useMutation, useQueryClient} from "@tanstack/react-query";

import {currentUser} from "~/auth/lib/auth";

import {createDocument} from "../api";
import {Document} from "../types";

const useMutateDocument = () => {
  const queryClient = useQueryClient();

  const mutationFn = async (file: File) => {
    await createDocument(file);
  };

  const {mutate, isPending: isMutating} = useMutation({
    mutationFn,
    onMutate: async (newDocument) => {
      await queryClient.cancelQueries({queryKey: ["documents"]});
      const previousDocuments = queryClient.getQueryData(["documents"]);

      await queryClient.setQueryData(["documents"], (oldDocuments?: Document[]) => {
        if (oldDocuments === undefined) return [newDocument];

        return [...oldDocuments, newDocument];
      });

      return {previousDocuments};
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error, _, context) => {
      console.error(error);
      if (context?.previousDocuments != null) return;
      queryClient.setQueryData(["documents"], context?.previousDocuments);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ["documents"]});
    },
  });

  return {
    isMutating,
    mutate,
  };
};

export {useMutateDocument};
