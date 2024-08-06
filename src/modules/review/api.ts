"use server";

import {currentUser} from "~/auth/lib/auth";
import {addReviews, findReviews} from "~/review/data";

import {Review} from "./types";

export const getReviews = async () => {
  const user = await currentUser();

  if (!user) return {error: {message: "User not found"}};

  const reviews = await findReviews(user.id!);

  return {success: {reviews}};
};

export const createReviews = async ({reviews}: {reviews: Omit<Review, "id" | "userId">[]}) => {
  const user = await currentUser();

  if (!user) return {error: {message: "User not found"}};

  await addReviews(
    reviews.map((review) => ({
      ...review,
      userId: user.id!,
    })),
  );

  return {success: {reviews}};
};
