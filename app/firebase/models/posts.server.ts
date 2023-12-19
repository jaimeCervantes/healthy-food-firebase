import { dataPoint } from "../db.server";
import { getStorage } from "firebase-admin/storage";
import invariant from "tiny-invariant";
import type { Post, FirestorePost, PostUser } from "~/types/publish";
import type { CollectionReference } from "firebase-admin/firestore";
import { Timestamp } from "firebase-admin/firestore";
import { getFinalString } from "~/functions/string";

const db = {
  posts: () => dataPoint<FirestorePost>("posts"),
};

export async function getPosts() {
  const posts = await db.posts().get();
  const postData = posts.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  return postData;
}

export async function getPost(slug: string) {
  try {
    const posts = await db.posts().get();
    const postData = posts.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    const requestPostId = getFinalString(slug, "-");

    const requestPost = postData.filter((post) => post.id === requestPostId);

    if (!requestPost) {
      return {
        errorMessage: "No se encontró el post",
      };
    }

    return requestPost;
  } catch (error: any) {
    return {
      errorMessage: "Algo salio mal al buscar/obtener el post",
    };
  }
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

  const post = await db.posts().add({
    ...postInfo,
    image: bucket.file(`posts/${image.name}`).publicUrl(),
    user,
    createdAt: Timestamp.now(),
  });

  return post.id;
}
