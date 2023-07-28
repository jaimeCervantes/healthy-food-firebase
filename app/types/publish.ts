import type { Timestamp } from "firebase-admin/firestore";

export type PostUser = {
  uid: string;
  email?: string;
  displayName?: string;
  phoneNumber?: string;
  photoURL?: string;
};

export type Post =
  | {
      id?: string;
      title: string;
      description: string;
      price: number;
    }
  | { [k: string]: FormDataEntryValue };

export type FirestorePost = Post & {
  image: string;
  user: PostUser;
  createdAt: Timestamp;
  slug?: string;
};
