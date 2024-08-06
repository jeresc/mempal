"use server";

import {
  addSubscription,
  findActiveSubscriptionByUserId,
  updateSubscription,
} from "~/subscription/data";
import {currentUser} from "~/auth/lib/auth";

import {Subscription} from "./types";

import {generateFirestoreId} from "@/lib/utils/generate-id";

export const getSubscription = async () => {
  const user = await currentUser();

  if (!user) return {error: {message: "User not found"}};

  const activeSubscription = await findActiveSubscriptionByUserId(user.id!);

  if (activeSubscription) return {success: {subscription: activeSubscription}};

  const firestoreId = generateFirestoreId();

  const newSubscription = await addSubscription(firestoreId, user.id!);

  return {success: {subscription: newSubscription}};
};

export const patchSubscription = async (data: Partial<Subscription>) => {
  const user = await currentUser();

  if (!user) return {error: {message: "User not found"}};

  const subscription = await findActiveSubscriptionByUserId(user.id!);

  if (!subscription) return {error: {message: "Subscription not found"}};

  await updateSubscription(subscription.id, data);

  return {success: {subscription}};
};
