import { useLoaderData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { requireAuth } from "~/firebase/auth.server";
import type { LoaderArgs } from "@remix-run/node";
import { createPost } from "~/firebase/models/posts.server";
import PwPublisForm from "../components/PublishForm/PublishForm";

export function meta() {
  return [
    { title: "Publica tu comida sana" },
    { name: "description", content: "Publica tu comida sana" },
  ];
}

export async function loader({ request }: LoaderArgs) {
  const user = await requireAuth(request);

  return json({
    displayName: user.displayName,
  });
}

export async function action({ request }: LoaderArgs) {
  const { uid, displayName, email, phoneNumber, photoURL } = await requireAuth(
    request,
  );
  const data = await request.formData();
  const { image, ...post } = Object.fromEntries(data.entries());

  await createPost(post, image as File, {
    uid,
    displayName,
    email,
    phoneNumber,
    photoURL,
  });

  return redirect("/");
}

export default function Publish() {
  const user = useLoaderData();
  return <PwPublisForm userName={user.displayName} />;
}
