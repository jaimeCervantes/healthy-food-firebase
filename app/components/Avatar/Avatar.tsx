import type {
  AvatarProps,
  AvatarImageProps,
  AvatarTextProps,
} from "./Avatar.d";
import { getBackgroundColor, styleSizeAvatar, styleSizeText } from "./styles";
import { useInitials } from "./useInitails";

export default function Avatar({
  userName = "",
  photoUrl,
  size,
  children,
  className,
  rounded,
  onClick,
  ...moreProps
}: AvatarProps) {
  const initials = useInitials(userName);
  const backgroundColor = getBackgroundColor(initials.charAt(0));

  const styleContainer = `relative grid place-items-center ${backgroundColor} ${
    styleSizeAvatar[size || "md"]
  } ${rounded ? "rounded-full" : "rounded"} ${
    onClick ? "cursor-pointer" : ""
  } ${className ? className : ""}`;

  return (
    <figure
      data-testid="avatar"
      onClick={onClick}
      className={styleContainer}
      {...moreProps}
    >
      {photoUrl ? (
        <AvatarImage rounded={rounded} src={photoUrl} size={size} />
      ) : (
        <AvatarText initials={initials} size={size} />
      )}
      {children}
    </figure>
  );
}

function AvatarImage({ src, size, rounded }: AvatarImageProps) {
  return (
    <img
      className={`${styleSizeAvatar[size || "md"]} object-cover ${
        rounded ? "rounded-full" : "rounded"
      }`}
      src={src}
      alt="Avatar del usuario"
    />
  );
}

function AvatarText({ size, initials }: AvatarTextProps) {
  return (
    <span
      className={`font-medium text-pw-white ${styleSizeText[size || "md"]}`}
    >
      {initials}
    </span>
  );
}
