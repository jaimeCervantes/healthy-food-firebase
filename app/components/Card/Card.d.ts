import type { ElementType } from "react";

export type CardProps = {
  title: string;
  image: { src: string; alt: string };
  createdAt: Date;
  createdAtLocale: string;
  className?: string;
  Container?: ElementType;
  style?: Object;
  user?: {
    displayName?: string;
    email?: string;
    photoURL?: string;
    phoneNumber?: string;
  };
  footerChildren?: JSX.Element | string | null | undefined;
  AnchorElement?: ElementType;
  anchorProps: { [key: string]: string };
};
