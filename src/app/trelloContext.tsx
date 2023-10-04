"use client";

import { createContext, useContext, useReducer, FormEvent } from "react";
import { todoList, inProgressList, doneList } from "../app/api/api";
import { TodoListType, TrelloContextType } from "./api/type";
import { InputValueType } from "./ui-components/edit-card-dialog";
import { Inputs } from "./components/edit-card-form";

export const TrelloContext = createContext<TrelloContextType>(
  {} as TrelloContextType
);

const initialValue = {
  todoList,
  inProgressList,
  doneList,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_NEW_CARD": {
      const NewCard = {
        title: "",
        id: Math.floor(Math.random() * 100) + 1,
        user: {
          name: "Brayan",
          avatar: "/user-profile-icon-free-vector.jpg",
        },
        comments: [],
      };
      const listId = action.event.target.parentNode.parentNode.dataset.id;

      const newList = structuredClone(state);
      if (action.newCardTitle !== "") {
        NewCard.title = action.newCardTitle;
        newList[listId].push(NewCard);
      }
      return newList;
    }
    case "EDIT_CARD": {
      action.event.preventDefault();
      const listclone = structuredClone(state);
      const todoIndex = listclone[action.id].findIndex(
        (card: TodoListType) => card.id === action.todo.id
      );
      const choosenCard = listclone[action.id][todoIndex];
      if (action.inputValue.title) {
        choosenCard.title = action.inputValue.title;
      }
      if (action.inputValue.input[0]) {
        const actualImgValue = URL.createObjectURL(action.inputValue.input[0]);
        choosenCard.user.avatar = actualImgValue;
      }
      return listclone;
    }
    case "DRAG_COMPLETED": {
      const list = action.event.target.parentNode.dataset.id;
      const listclone = structuredClone(state);
      const newList = listclone[action.stateDrag.list].filter(
        (item: TodoListType) => item.id !== action.stateDrag?.data.id
      );
      listclone[action.stateDrag?.list] = newList;
      listclone[list]?.push(action.stateDrag?.data);
      return listclone;
    }
  }
};

const initialDragValue = null;
const dragreducer = (state: any, action: any) => {
  switch (action.type) {
    case "DRAG_START": {
      state = {
        data: {
          title: action.todo.title,
          user: action.todo.user,
          comments: action.todo.comments,
          id: action.todo.id,
        },
        // list: action.listIdNameRef.current.dataset.id,
        list: action.event.target.dataset.id,
      };

      return state;
    }
  }
};

export function TrelloProvider({ children }: { children: React.ReactNode }) {
  const [stateCard, dispatch] = useReducer(reducer, initialValue);
  const [stateDrag, dispatchDrag] = useReducer(dragreducer, initialDragValue);

  const addNewCard = (event: React.DragEvent, newCardTitle: string) =>
    dispatch({
      type: "ADD_NEW_CARD",
      event: event,
      newCardTitle: newCardTitle,
    });

  const editCards = (
    event: FormEvent,
    id: string,
    todo: TodoListType,
    inputValue: Inputs
  ) =>
    dispatch({
      type: "EDIT_CARD",
      event: event,
      id: id,
      todo: todo,
      inputValue: inputValue,
    });

  const completedDrag = (event: React.DragEvent) =>
    dispatch({
      type: "DRAG_COMPLETED",
      event: event,
      stateDrag: stateDrag,
    });
  const dragStart = (event: React.DragEvent, todo: TodoListType) => {
    dispatchDrag({
      type: "DRAG_START",
      event: event,
      todo: todo,
    });
  };

  return (
    <TrelloContext.Provider
      value={{
        stateCard,
        addNewCard,
        editCards,
        dragStart,
        completedDrag,
      }}
    >
      {children}
    </TrelloContext.Provider>
  );
}

export const useTrelloContext = () => {
  const data = useContext(TrelloContext);
  return data;
};
