import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";

import {createDocument} from "~/document/api";
import {Document} from "~/document/types";

const useAddDocument = () => {
  const queryClient = useQueryClient();

  const mutationFn = async ({
    file,
    docId,
    text,
    topics,
    startPage,
    endPage,
  }: {
    file: File;
    docId: string;
    text: string;
    topics: string[];
    startPage: number;
    endPage: number;
  }) => {
    const createDocumentResult = await createDocument(
      file,
      docId,
      text,
      topics,
      startPage,
      endPage,
    );

    if (createDocumentResult.error !== undefined) throw Error(createDocumentResult.error.message);

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
    onSuccess: () => {
      toast.success("Document created successfully");
    },
    onError: (error, _, context) => {
      toast.error("Error creating document: " + error);
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

export {useAddDocument};
