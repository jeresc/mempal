import {useMutation, useQueryClient} from "@tanstack/react-query";

import {createDocument} from "../api";
import {Document} from "../types";

const useMutateDocument = () => {
  const queryClient = useQueryClient();

  const {mutate, isPending: isMutating} = useMutation({
    mutationFn: createDocument,
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

  const handleSubmit = async (data: Omit<Document, "id" | "createdAt">) => {
    mutate(data);
  };

  return {
    isMutating,
    handleSubmit,
  };
};

export {useMutateDocument};
