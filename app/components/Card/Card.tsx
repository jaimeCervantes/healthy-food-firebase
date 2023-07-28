import Avatar from "../Avatar/Avatar";
import type { CardProps } from "./Card.d";

export default function Card({
  title,
  image,
  createdAt,
  createdAtLocale,
  className,
  Container = "article",
  style = {},
  user = {},
  footerChildren = null,
  AnchorElement = "a",
  anchorProps = {},
}: CardProps) {
  const clsN = `border bg-white-300 shadow-md ${className ?? ""}`;

  return (
    <Container className={clsN} style={style ?? ""}>
      <AnchorElement {...anchorProps}>
        <img src={image.src} alt={image.alt} className="object-cover" />
      </AnchorElement>

      <section className="p-2">
        <h3>
          <AnchorElement {...anchorProps}>{title}</AnchorElement>
        </h3>
        <div className="flex justify-start gap-2 items-center">
          <Avatar
            rounded
            userName={user.displayName}
            photoUrl={user.photoURL}
          />
          <p className="flex flex-col">
            {user.displayName}
            <time
              dateTime={createdAt?.toString()}
              className="first-letter:uppercase text-sm text-gray-500"
            >
              {createdAtLocale}
            </time>
          </p>
        </div>
      </section>

      {footerChildren && (
        <footer className="flex flex-wrap p-2">{footerChildren}</footer>
      )}
    </Container>
  );
}
