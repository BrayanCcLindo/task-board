"use client";

import Card from "./card";
import List from "./list";
import Image from "next/image";
import DialogDemo from "../ui-components/dialog";
import { useTrelloContext } from "../trelloContext";
import { twMerge } from "tailwind-merge";

function Board() {
  const { completedDrag, stateCard } = useTrelloContext();
  return (
    <div className="flex flex-col flex-1 p-4 gap-4">
      <div className="flex gap-4 items-center">
        <h1 className="font-bold text-lg text-white md:text-2xl">
          Development
        </h1>
        <div className="flex ">
          <Image
            src="/profile1.svg"
            className="rounded-full"
            width={50}
            height={50}
            alt=""
          />
          <Image
            src="/profile2.svg"
            className="rounded-full "
            width={50}
            height={50}
            alt=""
          />
          <Image
            src="/profile3.svg"
            className="rounded-full "
            width={50}
            height={50}
            alt=""
          />
        </div>
        <DialogDemo />
      </div>
      <main
        className={twMerge(
          "block whitespace-nowrap overflow-auto scroll-smooth",
          "md:flex flex-1 gap-6"
        )}
      >
        <List
          handleDrop={(event) => {
            completedDrag(event);
          }}
          title="To-Do"
          id="todoList"
        >
          {stateCard.todoList.map((todo) => (
            <Card key={todo.id} todo={todo} id="todoList" />
          ))}
        </List>
        <List
          handleDrop={(event) => {
            completedDrag(event);
          }}
          id="inProgressList"
          title="In Progress"
        >
          {stateCard.inProgressList.map((todo) => (
            <Card key={todo.id} todo={todo} id="inProgressList" />
          ))}
        </List>
        <List
          handleDrop={(event) => {
            completedDrag(event);
          }}
          id="doneList"
          title="Done"
        >
          {stateCard.doneList.map((todo) => (
            <Card key={todo.id} todo={todo} id="doneList" />
          ))}
        </List>
      </main>
      <div className="flex gap-4 justify-center items-center md:hidden">
        <a
          href="#todoList"
          className="h-[25px] w-[25px] rounded-full bg-button "
        ></a>
        <a
          href="#inProgressList"
          className="h-[25px] w-[25px] rounded-full bg-button"
        ></a>
        <a
          href="#doneList"
          className="h-[25px] w-[25px] rounded-full bg-button"
        ></a>
      </div>
    </div>
  );
}

export default Board;
