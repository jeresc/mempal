"use server";

import {
  QuerySnapshot,
  Timestamp,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import {FirestoreSubscription, Subscription, Tier} from "~/subscription/types";

import {getFirebase} from "@/lib/firebase";
import {generateFirestoreId} from "@/lib/utils/generate-id";

export const findSubscriptionByUserId = async (userId: string) => {
  const {firestore} = getFirebase();

  const q = query(collection(firestore, "subscriptions"), where("userId", "==", userId));

  const querySnap = (await getDocs(q)) as QuerySnapshot<FirestoreSubscription>;

  const subscription = querySnap.docs[0];

  return {
    ...subscription.data(),
    createdAt: subscription.data().createdAt.toDate(),
  };
};

export const findActiveSubscriptionByUserId = async (userId: string) => {
  const {firestore} = getFirebase();

  const monthAgo = Timestamp.fromDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));

  const q = query(
    collection(firestore, "subscriptions"),
    where("userId", "==", userId),
    where("createdAt", ">", monthAgo),
  );

  const querySnap = (await getDocs(q)) as QuerySnapshot<FirestoreSubscription>;

  const subscription = querySnap.docs[0];

  if (!subscription) return null;

  return {
    ...subscription.data(),
    createdAt: subscription.data().createdAt.toDate(),
  };
};

export const addSubscription = async (id: string = generateFirestoreId(), userId: string) => {
  const {firestore} = getFirebase();

  const timestamp = Timestamp.now();

  await setDoc(doc(firestore, "subscriptions", id), {
    userId,
    tier: Tier.Free,
    id,
    documentsCreated: 0,
    createdAt: timestamp,
  });

  return {
    id,
    userId,
    tier: Tier.Free,
    documentsCreated: 0,
    createdAt: timestamp.toDate(),
  };
};

export const updateSubscription = async (id: string, data: Partial<Subscription>) => {
  const {firestore} = getFirebase();

  await updateDoc(doc(firestore, "subscriptions", id), {
    ...data,
  });
};
