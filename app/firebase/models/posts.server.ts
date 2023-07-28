import { dataPoint } from "../db.server";
import { getStorage } from "firebase-admin/storage";
import invariant from "tiny-invariant";
import type { Post, FirestorePost, PostUser } from "~/types/publish";
import { Timestamp } from "firebase-admin/firestore";
import type { CollectionReference } from "firebase-admin/firestore";

export const collections = {
  posts: () => dataPoint<FirestorePost>("posts"),
};

export async function getPosts() {
  const posts = await collections.posts().get();
  const postData = posts.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  return postData;
}

export async function createPost(postInfo: Post, image: File, user: PostUser) {
  invariant(
    postInfo?.constructor === {}.constructor,
    `"postInfo" debe ser un objeto, no un ${postInfo && postInfo?.constructor}`,
  );

  invariant(
    image?.constructor === File,
    `"image" debe ser un File, no un ${image && image?.constructor}`,
  );

  invariant(
    user?.constructor === {}.constructor,
    `"user" debe ser un objeto, no un ${user && user?.constructor}`,
  );

  const bucket = getStorage().bucket();
  const buffer = Buffer.from(await image.arrayBuffer());

  await bucket
    .file(`posts/${image.name}`)
    .save(buffer, { contentType: image.type });

  const post = await collections.posts().add({
    ...postInfo,
    image: bucket.file(`posts/${image.name}`).publicUrl(),
    user,
    createdAt: Timestamp.now(),
  });

  return post.id;
}

export async function createSlug(
  title: string,
  collection: CollectionReference<FirestorePost> = collections.posts(),
) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  const doc = await collection.where("slug", "==", slug).get();

  if (doc.size) {
    return `${slug}-${doc.size}`;
  }

  return slug;
}
