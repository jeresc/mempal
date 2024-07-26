import {useMutation, useQueryClient} from "@tanstack/react-query";

import {createDocument} from "../api";
import {Document} from "../types";

const useMutateDocuments = () => {
  const queryClient = useQueryClient();

  const mutationFn = async ({file, docId, text}: {file: File; docId: string; text: string}) => {
    await createDocument(file, docId, text);

    return docId;
  };

  const {mutate, isPending: isMutating} = useMutation({
    mutationFn,
    onMutate: async ({docId, text}) => {
      await queryClient.cancelQueries({queryKey: ["documents"]});
      const previousDocuments = queryClient.getQueryData(["documents"]);
      const newDocument = {id: docId, createdAt: new Date(), title: "", mediaId: "", text};

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
