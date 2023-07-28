import { Form } from "@remix-run/react";
import TextField from "../TextField/TextField";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Button from "../Button/Button";

const btnStyles = "font-bold";

export default function SignUpForm({
  children,
  moreActions,
}: {
  children?: JSX.Element | string;
  moreActions?: JSX.Element | string;
}) {
  const [state, setState] = useState({
    canSubmit: false,
    password: "",
    passwordAgain: "",
    isInUse: false,
    passwordError: "",
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    if (!state.canSubmit) {
      e.preventDefault();
    }
  }

  function onChangePassword(e: ChangeEvent<HTMLInputElement>) {
    setState((prev) => ({ ...prev, password: e.target.value }));
  }

  function verifyPassword(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setState((prev) => ({
      ...prev,
      canSubmit: prev.password === value,
      passwordAgain: value,
      isInUse: true,
    }));
  }

  return (
    <Form method="POST" data-cy="signUp-form" onSubmit={handleSubmit}>
      <TextField
        name="name"
        label="*Nombre"
        placeholder="Nombre"
        autoFocus
        type="text"
        required
        pattern=".{3,}"
      ></TextField>

      <TextField
        label="*E-mail"
        name="email"
        placeholder="you@example.com"
        type="email"
        required
        pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
      ></TextField>

      <TextField
        label="*Contraseña"
        name="password"
        placeholder="Contraseña"
        type="password"
        required
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        onChange={onChangePassword}
      >
        * Minimo 8 caracteres, una mayuscula, una minuscula y un numero
      </TextField>

      <TextField
        label="*Repetir contraseña"
        name="passwordAgain"
        placeholder="Repite la contraseña"
        type="password"
        required
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        onChange={verifyPassword}
        error={
          !state.canSubmit && state.isInUse
            ? "Las contraseñas deben coincidir"
            : null
        }
      ></TextField>

      {children}

      <footer className="flex gap-3">
        <Button type="submit" color="green" className={btnStyles}>
          Registrarme
        </Button>

        {moreActions}
      </footer>
    </Form>
  );
}
