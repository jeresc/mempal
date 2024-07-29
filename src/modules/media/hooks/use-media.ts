import {useQuery} from "@tanstack/react-query";

import {getMediaById} from "~/media/api";
import {Media} from "~/media/types";

const useMedia = ({mediaId}: {mediaId: Media["id"]}) => {
  const queryFn = async () => {
    if (!mediaId) return;
    const media = await getMediaById(mediaId);

    return media;
  };

  const {data, isPending, error} = useQuery({
    queryKey: ["media", mediaId],
    queryFn,
    staleTime: 10 * 60 * 1000,
    enabled: !!mediaId,
  });

  const media: Partial<Media> = data?.success?.media ?? {};

  return {
    media,
    isPending,
    error,
  };
};

export {useMedia};
