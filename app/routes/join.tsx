import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData, Link } from "@remix-run/react";
import { checkSessionCookie, signUp } from "~/firebase/auth.server";
import { commitSession, getSession } from "~/sessions";
import SignUpForm from "~/components/SignUpForm/SignUpForm";
import ButtonLink from "~/components/ButtonLink/ButtonLink";

export const loader = async ({ request }: LoaderArgs) => {
  const session = await getSession(request.headers.get("cookie"));
  const { uid } = await checkSessionCookie(session);
  const headers = {
    "Set-Cookie": await commitSession(session),
  };
  if (uid) {
    return redirect("/", { headers });
  }
  return json(null, { headers });
};

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const name = form.get("name");
  const email = form.get("email");
  const password = form.get("password");
  const formError = json(
    { error: "Te faltan campos por llenar." },
    { status: 400 },
  );
  if (typeof name !== "string") return formError;
  if (typeof email !== "string") return formError;
  if (typeof password !== "string") return formError;
  try {
    const sessionCookie = await signUp(name, email, password);
    const session = await getSession(request.headers.get("cookie"));
    session.set("session", sessionCookie);
    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    console.error(error);
    return json({ error: String(error) }, { status: 401 });
  }
};

const btnStyles = "font-bold text-blue-600";

export default function Join() {
  const actionData = useActionData<typeof action>();

  return (
    <>
      <h1>Registro</h1>
      {actionData?.error ? <p>{actionData.error}</p> : null}
      <SignUpForm
        moreActions={
          <ButtonLink to="/login" className={btnStyles}>
            Iniciar sesión
          </ButtonLink>
        }
      ></SignUpForm>
    </>
  );
}
