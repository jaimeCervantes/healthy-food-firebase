import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "react-router";
import Avatar from "~/components/Avatar/Avatar";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BiSolidPhoneCall, BiLeftArrowAlt } from "react-icons/bi";
import ButtonLink from "~/components/ButtonLink/ButtonLink";
import { Link } from "@remix-run/react";

export async function loader({ params }: LoaderArgs) {
  const { slug } = params;
  return slug;
}

export default function Post() {
  return (
    <section className="p-1">
      <figure className="relative">
        <img
          data-testid="image-food"
          src="https://www.cardamomo.news/__export/1614368658290/sites/debate/img/2021/02/26/pollo_relleno.jpeg_341150531.jpeg"
          alt=""
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

      <h2 className="mt-2 font-bold">Ensalada de lechuga italiana</h2>

      <div className="flex items-center justify-between mt-2">
        <div className="font-bold text-pw-orange text-2xl">
          <span>$25.00</span>
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
          <p className="font-semibold text-pw-black/80">Jose Octavio</p>
        </div>

        <div className="flex items-center gap-1">
          <BiSolidPhoneCall className="text-pw-black" />

          <Link to="tel:2781205512">
            <span className="font-semibold text-pw-black/80">278 120 5512</span>
          </Link>
        </div>
      </div>

      <hr className="m-4" />

      <div>
        <p className="font-semibold">Descripción</p>
        <span className="text-sm text-pw-black/80">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum
          neque aspernatur tenetur consectetur at id? Numquam cum vero error
          eaque consequatur? Dolorum et libero minus earum omnis praesentium.
          Officiis, tempora?
        </span>
      </div>
    </section>
  );
}
