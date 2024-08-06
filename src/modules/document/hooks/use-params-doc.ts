"use client";
import {useParams, usePathname} from "next/navigation";

export const useParamsDoc = () => {
  const params = useParams();
  const pathname = usePathname();

  if (!pathname.startsWith("/d/"))
    return {
      docId: "",
      docTitle: "",
    };

  const docUrl = Array.isArray(params.docId) ? params.docId[0] : params.docId;

  return {
    docTitle: docUrl.split("-").slice(0, -1).join(" "),
    docId: docUrl.split("-").at(-1)!,
  };
};
