"use client";
import { MessageSquare } from "lucide-react";
import Image from "next/image";
import { CardType, DataType, TodoListType } from "../api/type";
import EdiCardDialog from "../ui-components/edit-card-dialog";
import { useTrelloContext } from "../trelloContext";
import { LegacyRef } from "react";

function Card({ todo, id }: { todo: TodoListType; id: string }) {
  const countComents = todo?.comments?.length;
  const { dragStart } = useTrelloContext();

  return (
    <div
      data-id={id}
      draggable
      onDragStart={(event) => {
        dragStart(event, todo);
      }}
      className="bg-white flex flex-col rounded-lg gap-4 p-4"
    >
      <div className="custom-flex-between">
        <h4 className="">{todo?.title}</h4>
        <EdiCardDialog id={id} todo={todo} />
      </div>
      <div className="custom-flex-between">
        <button className="flex items-center gap-2">
          <MessageSquare />
          {countComents ?? 0 > 0 ?? <span>{countComents ?? 0}</span>}
        </button>
        <Image src={todo?.user?.avatar} alt="" width={32} height={32} />
      </div>
    </div>
  );
}

export default Card;
