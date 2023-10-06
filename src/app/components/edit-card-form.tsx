"use client";

import { useForm } from "react-hook-form";
import { useTrelloContext } from "../trelloContext";
import { TodoListType } from "../api/type";
import Image from "next/image";
import { useState } from "react";

export type Inputs = {
  title: string;
  input: string;
};

function EditarCardForm({
  todo,
  id,
  setOpen,
}: {
  todo: TodoListType;
  id: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { editCards } = useTrelloContext();
  const [image, setImage] = useState(todo.user.avatar);

  return (
    <form
      onSubmit={handleSubmit((inputValue, event: any) => {
        console.log(errors, "errors");

        editCards(event, id, todo, inputValue);
        setOpen(false);
      })}
      className="flex flex-col gap-4"
    >
      <label className="text-base font-semibold" htmlFor="name">
        Editar Titulo
      </label>
      <input
        {...register("title", {
          required: "Title is required",
          pattern: /^[A-Za-z]+@/i,
        })}
        aria-invalid={errors.title ? true : false}
        className="p-4 focus:shadow-violet8 inline-flex rounded-lg bg-gray-100  px-[10px] text-[15px] leading-none "
        id="name"
        placeholder={todo.title}
      />
      {errors.title && (
        <p className="text-red-500 text-sm font-semibold">
          {errors.title.message}
        </p>
      )}

      <label className="mt-4 text-base font-semibold" htmlFor="image">
        Editar Imagen
      </label>
      <input
        {...register("input", {
          required: "Title is required",
          onChange: (event) => {
            if (event.target.files[0]) {
              const actualImgValue = URL.createObjectURL(event.target.files[0]);
              setImage(actualImgValue);
            }
          },
        })}
        type="file"
        className="p-4  inline-flex rounded-lg   px-[10px] text-[15px] leading-none "
        id="image"
      />
      <Image
        className="rounded-full object-cover object-center"
        src={image}
        width={200}
        height={200}
        alt=""
      />
      <button
        type="submit"
        className="bg-button text-white hover:scale-105 duration-100 focus:scale-110 inline-flex  items-center justify-center rounded-lg p-2 py-4 font-medium"
      >
        Save Changes
      </button>
    </form>
  );
}

export default EditarCardForm;
