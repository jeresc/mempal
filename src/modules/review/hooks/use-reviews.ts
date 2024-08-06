import {useQuery} from "@tanstack/react-query";

import {getReviews} from "~/review/api";
import {Review} from "~/review/types";

const useReviews = () => {
  const queryFn = async () => {
    const reviewsResult = await getReviews();

    if (reviewsResult.error) throw reviewsResult.error;

    return reviewsResult.success.reviews;
  };

  const {data, isPending, error} = useQuery({
    queryKey: ["reviews"],
    queryFn,
    staleTime: 10 * 60 * 1000,
  });

  const reviews: Review[] = data ?? [];

  return {
    reviews,
    isPending,
    error,
  };
};

export {useReviews};
