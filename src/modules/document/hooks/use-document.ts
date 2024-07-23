import {useQuery} from "@tanstack/react-query";

import {Document} from "~/document/types";

import {getDocumentById} from "../api";

const useDocument = ({docId}: {docId: Document["id"]}) => {
  const queryFn = async () => {
    const document = await getDocumentById(docId);

    return document;
  };

  const {data, isPending, error} = useQuery({
    queryKey: ["documents", docId],
    queryFn,
    staleTime: 10 * 60 * 1000,
  });

  const document: Partial<Document> = data?.success?.document ?? {};

  return {
    document,
    isPending,
    error,
  };
};

export {useDocument};
