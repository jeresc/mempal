import {useMutation, useQueryClient} from "@tanstack/react-query";

import {patchDocument} from "../api";
import {Document} from "../types";

const useMutateDocument = ({docId}: {docId: string; initialData?: Partial<Document>}) => {
  const queryClient = useQueryClient();

  const mutationFn = async ({data}: {data: Partial<Omit<Document, "id" | "createdAt">>}) => {
    const newDocument = await patchDocument(docId, data);

    return newDocument?.success?.document;
  };

  const {mutate, isPending: isMutating} = useMutation({
    mutationFn,
    onMutate: async ({data: newData}) => {
      await Promise.all([
        queryClient.cancelQueries({queryKey: ["documents"]}),
        queryClient.cancelQueries({queryKey: ["documents", docId]}),
      ]);

      const previousDocuments = queryClient.getQueryData(["documents"]) as Document[];

      if (previousDocuments === undefined) return;

      const docIndex = previousDocuments.findIndex((doc) => doc.id === docId);
      const oldDocument = {...previousDocuments[docIndex]};
      const updatedDocument = {...previousDocuments[docIndex], ...newData};

      await Promise.all([
        queryClient.setQueryData(["documents"], (oldDocuments?: Document[]) => {
          if (oldDocuments === undefined) return [];

          return [
            ...oldDocuments.slice(0, docIndex),
            updatedDocument,
            ...oldDocuments.slice(docIndex + 1),
          ];
        }),
        queryClient.setQueryData(["documents", docId], (oldDocument?: Document) => {
          if (oldDocument === undefined) return updatedDocument;

          return {...oldDocument, ...updatedDocument};
        }),
      ]);

      return {previousDocuments, oldDocument};
    },
    onSuccess: (_data) => {},
    onError: (_error, _, context) => {
      if (context?.previousDocuments != null && context?.oldDocument != null)
        queryClient.setQueryData(["documents"], context?.previousDocuments);
      if (context?.oldDocument != null)
        queryClient.setQueryData(["documents", context?.oldDocument.id], context?.oldDocument);
    },
    onSettled: async () => {
      queryClient.invalidateQueries({queryKey: ["documents", docId]});
      queryClient.invalidateQueries({queryKey: ["documents"]});
    },
  });

  return {mutateDocument: mutate, isMutating};
};

export {useMutateDocument};
