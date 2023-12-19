import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "react-router";
import Avatar from "~/components/Avatar/Avatar";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BiSolidPhoneCall, BiLeftArrowAlt } from "react-icons/bi";
import ButtonLink from "~/components/ButtonLink/ButtonLink";
import { Link } from "@remix-run/react";
import { getPost } from "~/firebase/models/posts.server";
import { getFinalString } from "~/functions/string";

export async function loader({ params }: LoaderArgs) {
  const { slug } = params;
  const data = await getPost(slug || "");

  return { data };
}

export default function Post() {
  const { data } = useLoaderData();
  const post = data[0];
  const { user } = post;
  console.log(post);

  return (
    <section className="p-1">
      <figure className="relative">
        <img
          data-testid="image-food"
          src="http://127.0.0.1:4000/storage/healhty-food-2023-2024.appspot.com/posts/ensalada_de_verduras_y_frutas.jpg"
          alt={post.title}
          className=" rounded-xl h-[250px] w-full object-cover"
        />

        <ButtonLink
          data-testid="go-home"
          content={<BiLeftArrowAlt className="text-white text-xl" />}
          to="/"
          size="xs"
          className="absolute top-0 m-2 bg-pw-black/40"
        />
      </figure>

      <h2 className="mt-2 font-bold">{post.title}</h2>

      <div className="flex items-center justify-between mt-2">
        <div className="font-bold text-pw-orange text-2xl">
          <span>{`$${post.price}`}</span>
        </div>
        <div className="flex items-center gap-1">
          <FaMapMarkerAlt className="text-pw-orange" />
          <span className="font-semibold text-pw-orange/80">
            Cosolapa, oaxaca
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-1">
          <Avatar userName="Jose Octavio" size="xs" rounded />
          <p className="font-semibold text-pw-black/80">{user.displayName}</p>
        </div>

        <div className="flex items-center gap-1">
          <BiSolidPhoneCall className="text-pw-black" />

          <Link to="tel:2781205512">
            <span className="font-semibold text-pw-black/80">
              {user.phoneNumber}
            </span>
          </Link>
        </div>
      </div>

      <hr className="m-4" />

      <div>
        <p className="font-semibold">Descripción</p>
        <span className="text-sm text-pw-black/80">{post.description}</span>
      </div>
    </section>
  );
}
