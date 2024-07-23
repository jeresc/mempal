import {useMutation, useQueryClient} from "@tanstack/react-query";

import {createDocument} from "../api";
import {Document} from "../types";

const useMutateDocuments = () => {
  const queryClient = useQueryClient();

  const mutationFn = async ({file, docId}: {file: File; docId: string}) => {
    await createDocument(file, docId);

    return docId;
  };

  const {mutate, isPending: isMutating} = useMutation({
    mutationFn,
    onMutate: async ({docId}) => {
      await queryClient.cancelQueries({queryKey: ["documents"]});
      const previousDocuments = queryClient.getQueryData(["documents"]);
      const newDocument = {id: docId, createdAt: new Date(), title: "", mediaId: ""};

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

export {useMutateDocuments};
