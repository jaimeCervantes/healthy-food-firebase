import type { FirestorePost } from "~/types/publish";

export function mapPostsToIndex(posts: FirestorePost[]) {
  return posts.map((item: FirestorePost) => {
    return {
      id: item.id,
      title: item.title,
      price: item.price,
      description: item.description,
      image: {
        src: item.image,
        alt: item.title,
      },
      // for initial versions, we will only be focused in Mexico
      createdAt: item.createdAt?.toDate(),
      createdAtLocale: item.createdAt?.toDate()?.toLocaleString("es-MX", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
      user: item.user,
      to:
        item.slug ??
        `${item.title?.toLowerCase()?.replace(/\s/g, "-")}-${item.id}`,
    };
  });
}
