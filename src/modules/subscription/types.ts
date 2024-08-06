import {Timestamp} from "firebase/firestore";

export enum Tier {
  Free = "FREE",
  Basic = "BASIC",
  Premium = "PREMIUM",
}

export type FirestoreSubscription = {
  id: string;
  userId: string;
  tier: Tier;
  documentsCreated: number;
  createdAt: Timestamp;
};

export type Subscription = Omit<FirestoreSubscription, "createdAt"> & {
  createdAt: Date;
};
