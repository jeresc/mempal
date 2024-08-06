import {Timestamp} from "firebase/firestore";

import {Message} from "~/chat/actions/continue-conversation";

export type FirestoreDocument = {
  createdAt: Timestamp;
  title: string;
  userId: string;
  mediaId: string;
  topics: string[];
};

export type Document = Omit<FirestoreDocument, "createdAt"> & {
  createdAt: Date;
  id: string;
};

export type Chat = {
  id: string;
  history: Message[];
};
