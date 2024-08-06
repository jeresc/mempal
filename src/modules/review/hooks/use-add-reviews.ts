import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";

import {Review} from "~/review/types";
import {createReviews} from "~/review/api";

const useAddReviews = () => {
  const queryClient = useQueryClient();

  const mutationFn = async ({reviews}: {reviews: Omit<Review, "id" | "userId">[]}) => {
    const reviewsResult = await createReviews({reviews});

    if (reviewsResult.error) throw reviewsResult.error;

    return reviewsResult.success.reviews;
  };

  const {mutate, isPending: isMutating} = useMutation({
    mutationFn,
    mutationKey: ["reviews"],
    onMutate: async ({reviews}) => {
      await Promise.all([queryClient.cancelQueries({queryKey: ["reviews"]})]);
      const previousReviews = queryClient.getQueryData(["reviews"]);

      await queryClient.setQueryData(["reviews"], (oldReviews: Review[]) => {
        if (oldReviews === undefined) return [...reviews];
        console.log(oldReviews);

        return [...oldReviews, ...reviews];
      });

      return {previousReviews};
    },
    onSuccess: () => {
      toast.success("Reviews added successfully");
    },
    onError: (error, _, context) => {
      console.error("Error adding flashcards:", error);
      if (context?.previousReviews != null) {
        queryClient.setQueryData(["reviews"], context?.previousReviews);
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ["reviews"]});
    },
  });

  return {mutate, isMutating};
};

export {useAddReviews};
