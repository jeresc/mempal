import {Timestamp} from "firebase/firestore";

export type FirestoreDocument = {
  url: string;
  text: string;
  type: string;
  createdAt: Timestamp;
  title: string;
  userId: string;
};

export type Document = Omit<FirestoreDocument, "createdAt"> & {
  createdAt: Date;
  id: string;
};
