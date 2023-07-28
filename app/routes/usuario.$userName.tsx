import type { LoaderArgs } from "@remix-run/node";
import { Form, useParams } from "@remix-run/react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { UserRecord } from "firebase-admin/auth";
import { getLoggedUser } from "~/firebase/auth.server";
import Button from "~/components/Button/Button";
import Avatar from "~/components/Avatar/Avatar";

export async function loader({ request }: LoaderArgs) {
  const user: UserRecord | null = await getLoggedUser(request);
  return json({ user });
}

export default function UserProfile() {
  const paramUrl = useParams();
  const userId = paramUrl.userName;

  const loaderData = useLoaderData();
  const { user } = loaderData;

  return <>{user?.uid == userId ? <Content user={user} /> : <Error />}</>;
}

function Content({ user }) {
  return (
    <div>
      <div className="flex justify-center" data-testid="icon-avatar">
        <Avatar userName={user.displayName} size="xl" rounded />
      </div>
      <h2 className="text-center mb-4 font-bold">{user?.displayName}</h2>

      <hr className="h-1 bg-gray-200 rounded-lg" />

      <div className="px-7">
        <p className="text-gray-700 mb-3">
          <i>Correo:</i> <br />
          <span className="text-black text-lg font-semibold">
            {user?.email}
          </span>
        </p>

        <p className="text-gray-700 mb-3">
          <i>Numero de telefono:</i> <br />
          <span className="text-black text-lg font-semibold">
            {user?.phoneNumber ? user.phoneNumber : "Teléfono no encontrado"}
          </span>
        </p>
      </div>

      <Form method="post" action="/logout" className="float-right">
        <Button color="black" type="submit">
          Cerrar sesión
        </Button>
      </Form>
    </div>
  );
}

function Error() {
  return (
    <div>
      <h2>Error al cargar usuario</h2>
    </div>
  );
}
