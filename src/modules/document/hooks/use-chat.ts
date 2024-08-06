import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";

import {Message} from "~/chat/actions/continue-conversation";

import {addChatToDocument, getChatsByDocumentId} from "../data";
import {Chat} from "../types";

export const useChat = (docId: string) => {
  return useQuery<Chat[]>({
    queryKey: ["chat", docId],
    queryFn: async () => {
      return await getChatsByDocumentId(docId);
    },
  });
};

export const useAddChatMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({docId, history}: {docId: string; history: Message[]}) =>
      addChatToDocument(docId, {history}),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({queryKey: ["chat", variables.docId]});
    },
  });
};
