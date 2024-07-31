import {Timestamp} from "firebase/firestore";

export type FirestoreDocument = {
  createdAt: Timestamp;
  title: string;
  userId: string;
  mediaId: string;
  mediaUrl: string;
  topics: string[];
  deckId?: string;
};

export type Document = Omit<FirestoreDocument, "createdAt"> & {
  createdAt: Date;
  id: string;
};
