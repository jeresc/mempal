import {Timestamp} from "firebase/firestore";

export type FirestoreMedia = {
  url: string;
  text: string;
  type: string;
  createdAt: Timestamp;
  userId: string;
  startPage: number;
  endPage: number;
};

export type Media = Omit<FirestoreMedia, "createdAt"> & {
  createdAt: Date;
  id: string;
};
