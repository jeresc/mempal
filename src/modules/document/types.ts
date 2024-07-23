import {Timestamp} from "firebase/firestore";

export type FirestoreDocument = {
  createdAt: Timestamp;
  title: string;
  userId: string;
  mediaId: string;
};

export type Document = Omit<FirestoreDocument, "createdAt"> & {
  createdAt: Date;
  id: string;
};
