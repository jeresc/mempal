"use server";

import {
  QuerySnapshot,
  Timestamp,
  collection,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";

import {FirestoreReview, Review} from "./types";

import {getFirebase} from "@/lib/firebase";
import {generateFirestoreId} from "@/lib/utils/generate-id";

export const addReviews = async (reviews: Omit<Review, "id">[]) => {
  const {firestore} = getFirebase();
  const reviewIds: string[] = [];

  const batch = writeBatch(firestore);

  for (const review of reviews) {
    const dueAt = Timestamp.fromDate(review.dueAt);
    const reviewedAt = Timestamp.fromDate(review.reviewedAt);

    const reviewId = generateFirestoreId();

    reviewIds.push(reviewId);

    batch.set(doc(firestore, "reviews", reviewId), {
      ...review,
      id: reviewId,
      dueAt,
      reviewedAt,
    });
  }

  await batch.commit();

  return {
    reviews: reviews.map((review, i) => ({
      ...review,
      id: reviewIds[i],
    })),
  };
};

export const findsReviews = async (userId: string) => {
  const {firestore} = getFirebase();

  const weekAgo = Timestamp.fromDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));

  const q = query(
    collection(firestore, "reviews"),
    where("userId", "==", userId),
    where("reviewedAt", ">", weekAgo),
  );

  const querySnap = (await getDocs(q)) as QuerySnapshot<FirestoreReview>;

  return querySnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    dueAt: doc.data().dueAt?.toDate(),
    reviewedAt: doc.data().reviewedAt?.toDate(),
  }));
};
