"use client";

import { useTrelloContext } from "../trelloContext";
import { twMerge } from "tailwind-merge";
import EditProfile from "../ui-components/edit-profile";
import { MessageSquare, MoreHorizontal, Plus, X } from "lucide-react";
import Image from "next/image";
import { CardType } from "../api/type";
import EdiCardDialog from "../ui-components/edit-card-dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";

export type AddCard = {
  title: string;
};

function Board() {
  const { completedDrag, stateCard, stateProfile, addNewCard } =
    useTrelloContext();
  const [isFormOpen, setisFormOpen] = useState(false);

  const getList = (list: string) => {
    return stateCard?.filter((todo) => todo.list === list);
  };
  const startDrag = (event: any, item: CardType) => {
    event.dataTransfer.setData("itemID", item.id);
  };

  const draggingOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const id = "to-do";
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddCard>();

  return (
    <div className="flex flex-col flex-1 p-4 gap-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center ">
          {stateProfile.nombre !== "" ? (
            <h1 className="font-bold  text-white md:text-2xl">
              ¡Bienvenido {stateProfile.nombre}!
            </h1>
          ) : (
            <h1 className="font-bold py-4  text-white md:text-2xl">
              ¡Bienvenido!
            </h1>
          )}
          <Image
            className="rounded-full h-[40px] w-[40px] md:h-[60px] md:w-[60px] object-cover"
            src={stateProfile.foto}
            width={60}
            height={60}
            alt=""
          ></Image>
        </div>
        <EditProfile name={stateProfile.nombre} />
      </div>
      <main
        className={twMerge(
          "block whitespace-nowrap overflow-auto  scroll-smooth ",
          "md:flex flex-1 gap-4"
        )}
      >
        <div
          onDrop={(evt) => completedDrag(evt, "to-do")}
          onDragOver={(e) => draggingOver(e)}
          id="todo"
          className=" bg-[#253452]  w-full h-full inline-block p-4 rounded-lg flex-1 relative overflow-hidden"
        >
          <div className=" flex-1 w-full flex flex-col gap-6 absolute inset-0 overflow-auto p-4">
            <h2 className=" font-semibold text-white text-xl">
              Actividades por hacer
            </h2>
            {getList("to-do").map((todo, index) => (
              <div
                key={index}
                draggable
                onDragStart={(evt) => startDrag(evt, todo)}
                className={` bg-[#304973] flex flex-col gap-4 p-4 rounded-xl cursor-pointer relative  shadow-xl`}
              >
                <div className="bg-yellow-500 h-[10px] absolute inset-0 rounded-t-xl"></div>
                <div className="custom-flex-between">
                  <h2 className="text-lg font-semibold text-yellow-500 capitalize">
                    {todo.title}
                  </h2>{" "}
                  <EdiCardDialog id={todo.id} todo={todo} />
                </div>
                <div className="custom-flex-between text-xs items-center">
                  <div className="flex gap-1 items-center">
                    <Image
                      className="rounded-full h-[40px] w-[40px] object-cover"
                      width={30}
                      height={30}
                      alt=""
                      src={stateProfile.foto}
                    ></Image>
                    <p className="flex gap-4 font-semibold text-white">
                      {stateProfile.nombre}
                    </p>
                  </div>
                  <p className="flex gap-4 font-semibold text-white">
                    {todo.date}
                  </p>
                </div>
              </div>
            ))}
            {!isFormOpen ? (
              <div className="flex items-center justify-center mt-4 ">
                <button
                  className="rounded-full p-4 text-base text-white font-medium bg-[#304973]
              ring-opacity-60 ring-offset-2 ring-offset-neutral-800  focus:ring-2 w-[inherit] text-center 
              hover:scale-105 duration-100"
                  onClick={() => {
                    setisFormOpen(true);
                  }}
                >
                  <Plus />
                </button>
              </div>
            ) : (
              <form
                // onSubmit={(event) => {
                //   event.preventDefault();

                //   addNewCard(event, newcardValue, id);
                // }}
                onSubmit={handleSubmit((inputValue, event: any) => {
                  addNewCard(event, inputValue.title, id);
                  setisFormOpen(false);
                  setValue("title", ""); // ✅
                })}
                className="flex flex-col gap-4 mt-4 text-white"
              >
                <div className="flex justify-between items-center">
                  <label htmlFor="newTask" className="sr-only">
                    {" "}
                    Crear Todo{" "}
                  </label>
                  <input
                    autoFocus
                    type="text"
                    {...register("title", {
                      required: "Title is required",
                    })}
                    placeholder="Crear nueva tarea por hacer"
                    className="p-4  inline-flex rounded-lg bg-[#304973]  px-[10px] text-[15px] leading-none w-[85%]"
                  />
                  <button
                    type="button"
                    className="rounded-full p-2 text-base font-medium text-white
               ring-offset-2 ring-offset-neutral-800  focus:ring-2  text-center 
              hover:scale-105 duration-100"
                    onClick={() => {
                      setisFormOpen(false);
                    }}
                  >
                    <X />
                  </button>
                </div>

                {errors.title && (
                  <p className="text-red-500 text-sm font-semibold">
                    {errors.title.message}
                  </p>
                )}
                <button
                  type="submit"
                  className="bg-[#304973] p-4 text-white font-semibold rounded-xl hover:scale-105 duration-100"
                >
                  Crear
                </button>
              </form>
            )}
          </div>
        </div>
        <div
          onDrop={(evt) => completedDrag(evt, "in-progress")}
          onDragOver={(e) => draggingOver(e)}
          className=" bg-[#253452]  relative p-4 rounded-lg flex-1 inline-block  w-full h-full"
          id="inProgress"
        >
          <div className=" flex-1 w-full flex flex-col gap-6 absolute inset-0 overflow-auto p-4">
            <h2 className=" font-semibold text-xl text-white">
              Actividades en Progreso
            </h2>
            {getList("in-progress").map((todo, index) => (
              <div
                key={index}
                draggable
                onDragStart={(evt) => startDrag(evt, todo)}
                className={` bg-[#304973] flex flex-col gap-4 p-4 rounded-xl cursor-pointer relative  shadow-xl`}
              >
                <div className="bg-[#c670ff] h-[10px] absolute inset-0 rounded-t-xl"></div>

                <div className="custom-flex-between">
                  <h1 className="text-lg font-semibold text-[#c670ff] capitalize">
                    {todo.title}
                  </h1>{" "}
                  <EdiCardDialog id={todo.id} todo={todo} />
                </div>
                <div className="custom-flex-between text-xs items-center">
                  <div className="flex gap-1 items-center">
                    <Image
                      className="rounded-full h-[40px] w-[40px] object-cover"
                      width={30}
                      height={30}
                      alt=""
                      src={stateProfile.foto}
                    ></Image>
                    <p className="flex gap-4 font-semibold text-white">
                      {stateProfile.nombre}
                    </p>
                  </div>
                  <p className="flex gap-4 font-semibold text-white">
                    {todo.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          onDrop={(evt) => completedDrag(evt, "done")}
          onDragOver={(e) => draggingOver(e)}
          className="  bg-[#253452]  relative p-4 rounded-lg flex-1 inline-block  w-full h-full "
          id="done"
        >
          <div className=" flex-1 w-full flex flex-col gap-6 absolute inset-0 overflow-auto p-4 ">
            <h2 className=" font-semibold text-xl text-white">
              Actividades Finalizadas
            </h2>
            {getList("done").map((todo, index) => (
              <div
                key={index}
                draggable
                onDragStart={(evt) => startDrag(evt, todo)}
                className={` bg-[#304973] flex flex-col gap-4 p-4 rounded-xl cursor-pointer relative   shadow-xl`}
              >
                <div className="bg-green-500 h-[10px] absolute inset-0 rounded-t-xl"></div>

                <div className="custom-flex-between">
                  <h1 className="text-lg text-green-500 font-semibold capitalize">
                    {todo.title}
                  </h1>{" "}
                  <EdiCardDialog id={todo.id} todo={todo} />
                </div>
                <div className="custom-flex-between text-xs items-center">
                  <div className="flex gap-1 items-center">
                    <Image
                      className="rounded-full h-[40px] w-[40px] object-cover"
                      width={30}
                      height={30}
                      alt=""
                      src={stateProfile.foto}
                    ></Image>
                    <p className="flex gap-4 font-semibold text-white">
                      {stateProfile.nombre}
                    </p>
                  </div>
                  <p className="flex gap-4 font-semibold text-white">
                    {todo.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <div className="flex gap-4 justify-center items-center md:hidden">
        <a
          href="#todo"
          className="h-[15px] w-[15px] rounded-full bg-[#304973] "
        ></a>
        <a
          href="#inProgress"
          className="h-[15px] w-[15px] rounded-full bg-[#304973]"
        ></a>
        <a
          href="#done"
          className="h-[15px] w-[15px] rounded-full bg-[#304973]"
        ></a>
      </div>
    </div>
  );
}

export default Board;
