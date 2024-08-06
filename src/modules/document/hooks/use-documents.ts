import {useQuery} from "@tanstack/react-query";

import {Document} from "~/document/types";
import {getDocuments} from "~/document/api";

const useDocuments = () => {
  const queryFn = async () => {
    const documents = await getDocuments();

    return documents;
  };

  const {data, isPending, error} = useQuery({
    queryKey: ["documents"],
    queryFn,
    staleTime: 10 * 60 * 1000,
  });

  const documents: Document[] = data ?? [];

  return {
    documents,
    isPending,
    error,
  };
};

export {useDocuments};
