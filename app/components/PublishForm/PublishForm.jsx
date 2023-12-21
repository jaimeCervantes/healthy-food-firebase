import { Form } from "@remix-run/react";
import { Link } from "react-router-dom";
import { IconClose } from "../Icons";
import TextField from "../TextField/TextField";
import TextArea from "../TextArea/TextArea";
import SelectFile from "../SelectFile/SelectFile";
import { useState } from "react";
import Button from "../Button/Button";
import ButtonLink from "../ButtonLink/ButtonLink";

/* eslint-disable react/prop-types */
export default function PublishForm({ userName }) {
  const [srcImage, setSrcImage] = useState("");

  const onFileChange = (evt) => {
    const file = evt.target.files[0];

    const reader = new FileReader();
    reader.onload = handleReaderLoad;
    reader.readAsDataURL(file);
  };

  const handleReaderLoad = (evt) => {
    const imageUrl = evt.target.result;

    setSrcImage(imageUrl);
  };

  const removeImage = () => {
    setSrcImage(null);
  };

  return (
    <section className="max-md:rounded-none rounded-t-lg w-full">
      <div className="bg-pw-green rounded-t-lg max-md:rounded-t-none flex justify-center items-center max-md:text-center">
        <h1 className="text-lg p-2 text-white font-bold top-0 w-full">
          {userName || "Bienvenido"}, publica tu nueva comida sana
        </h1>
        <Link to="/" className="max-md:hidden">
          <IconClose />
        </Link>
      </div>

      <Form
        data-testid="form"
        method="POST"
        action="/publicar"
        className="p-4"
        encType="multipart/form-data"
      >
        <div className="grid gap-4 grid-cols-7 max-md:block">
          <TextField
            autoFocus
            required
            name="title"
            type="text"
            label="Titulo de la publicación: "
            data-testid="title-publish"
          />

          <TextField
            required
            name="price"
            type="number"
            label="Precio:"
            min="0"
            data-testid="price-publish"
          />
        </div>

        <SelectFile
          accept=".jpg, .png"
          onChange={onFileChange}
          title="Seleccionar un archivo:"
          placeholder="Selecciona tu imagen..."
          name="image"
          data-testid="image-publish"
        />

        {srcImage && (
          <div className="relative">
            <img
              data-testid="image-preview"
              src={srcImage}
              alt={srcImage}
              className="min-w-full border-2 p-1 border-pw-green max-h-[300px] max-md:h-[200px] object-cover mb-4"
            />
            <button
              onClick={removeImage}
              className="absolute bg-red-500 rounded-sm top-2.5 right-2.5"
            >
              <IconClose />
            </button>
          </div>
        )}

        <TextArea
          name="description"
          required
          label="Descripción del producto:"
          rows={8}
          maxLength={250}
          data-testid="description-publish"
        />

        <div className="flex justify-between gap-5 mt-4">
          <ButtonLink
            content="Cancelar"
            className="w-full border-red-700 text-red-700"
            to="/"
          />

          <Button
            type="submit"
            text="Publicar"
            className="w-full"
            color="green"
          />
        </div>
      </Form>
    </section>
  );
}
