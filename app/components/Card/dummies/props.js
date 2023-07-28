import verduras from "./assets/images/verduras.jpg";
const date = new Date();

export const props = {
  title: "Ensala con frutas",
  description:
    "Ensalada de lechuga italiana, cebolla morada, agucate, mango, piña, almendras, chia, semilla de calabaza y arandanos",
  image: {
    src: verduras,
    alt: "Ensalada con frutas",
  },
  price: 50,
  createdAt: date,
  createdAtLocale: date.toLocaleString("es-MX", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }),
  anchorProps: { href: "https://www.google.com" },
};
