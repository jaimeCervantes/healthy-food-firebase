import { submitLoginStyle } from "./stylesLogin";
import Button from "../Button/Button";
import ButtonLink from "../ButtonLink/ButtonLink";

export default function SubmitLogin({ isSubmit, changeSubmit }) {
  let buttonStyle;
  let contentButtons;

  buttonStyle = `${submitLoginStyle.main} ${submitLoginStyle.mediaQuery}`;
  contentButtons =
    "flex flex-row justify-evenly max-[640px]:flex-col max-[640px]:items-center";

  return (
    <div className={`${contentButtons}`}>
      <Button
        type="submit"
        color="green"
        className={`${buttonStyle}`}
        disabled={isSubmit}
        data-cy="login-button"
        data-testid="sing-in"
      >
        Ingresar
      </Button>

      {isSubmit ? (
        <ButtonLink
          className={`${submitLoginStyle.registerMain} ${submitLoginStyle.mediaQuery}`}
          data-testid="to-register-disable"
        >
          Registrar
        </ButtonLink>
      ) : (
        <ButtonLink
          to="/join"
          className={`${submitLoginStyle.registerMain} ${submitLoginStyle.mediaQuery}`}
          data-testid="to-register"
        >
          Registrar
        </ButtonLink>
      )}
    </div>
  );
}
