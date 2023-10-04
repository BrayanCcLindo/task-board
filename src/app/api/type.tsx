import { FormEvent, LegacyRef } from "react";
import { InputValueType } from "../ui-components/edit-card-dialog";
import { Inputs } from "../components/edit-card-form";

export type TodoListType = {
  title: string;
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  comments?: ComenntsType[];
};
type ComenntsType = {
  text?: string;
  user?: {
    name?: string;
    avatar?: string;
  };
};

export type DataType = {
  data: {
    title: string;
    user: {
      name: string;
      avatar: string;
    };
    comments?: ComenntsType[];
    id: number;
  };
  list: string;
};

export type CardType = {
  todoList: TodoListType[];
  inProgressList: TodoListType[];
  doneList: TodoListType[];
};
export type TrelloContextType = {
  stateCard: CardType;
  addNewCard: (event: React.DragEvent, newCardTitle: string) => void;
  editCards: (
    event: FormEvent,
    id: string,
    todo: TodoListType,
    inputValue: Inputs
  ) => void;
  dragStart: (event: React.DragEvent, todo: TodoListType) => void;
  completedDrag: (event: React.DragEvent) => void;
};
