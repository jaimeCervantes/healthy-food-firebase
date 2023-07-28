import { GoHomeFill } from "react-icons/go";
import { HiPencilAlt } from "react-icons/hi";
import { FaUser, FaUserLock } from "react-icons/fa";

import ButtonLink from "../ButtonLink/ButtonLink";

const sizeIcon = "text-3xl";

const links = [
  {
    to: "/",
    dataCy: "nav-home",
    icon: <GoHomeFill className={sizeIcon} />,
  },
  {
    to: "/publish",
    dataCy: "nav-publish",
    icon: <HiPencilAlt className={sizeIcon} />,
  },
];

export default function FooterNav({ user, navLinks = links }) {
  return (
    <div className="mt-2">
      <footer
        data-testid="footer-nav"
        className="w-full items-center flex justify-around fixed bottom-0 p-2 bg-pw-green text-white"
      >
        {navLinks.map(({ to, icon, dataCy, dataTestId }) => (
          <ButtonLink
            key={to}
            className="border-none p-2"
            to={to}
            content={icon}
            data-cy={dataCy}
            data-testid={dataTestId}
          />
        ))}
        {user ? <Profile userName={user.uid} /> : <Login />}
      </footer>
    </div>
  );
}

function Login() {
  return (
    <ButtonLink
      data-cy="nav-login"
      className="border-none p-2"
      to="/login"
      content={<FaUserLock className={sizeIcon} />}
    />
  );
}

function Profile({ userName }) {
  return (
    <ButtonLink
      data-cy="nav-login"
      className="border-none p-2"
      to={`/usuario/${userName}`}
      content={<FaUser className="text-2xl" />}
    />
  );
}
