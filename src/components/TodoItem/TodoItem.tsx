import React, { useEffect, useRef, useState } from "react";
import { IAction, ITodo } from "../../types/GlobalTypes";
import ActionsEnum from "../../data/ActionsEnum";
import styles from "./TodoItem.module.css";

interface ITodoItemProps {
  todo: ITodo;
  dispatch: React.Dispatch<IAction>;
}

interface IDeletionPromptProps {
  setWantsToDelete: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  deleteTodo: any;
}

const DeletionPrompt = ({setWantsToDelete, id, deleteTodo}: IDeletionPromptProps) => {
  return (
    <>
      <div className={styles.deletionPromptContainer}>
        <p>Are you sure?</p>
        <button onClick={() => deleteTodo(id)}>Yes</button>
        <button onClick={() => setWantsToDelete(false)}>No</button>
      </div>
    </>
  )
}

const TodoItem = ({ todo, dispatch }: ITodoItemProps) => {
  // TODO:
  const [isBeingEdited, setIsBeingEdited] = useState<boolean>(false);
  // Lift isBeingEdited to parent and add useClickOutside hook from
  // use-hooks to automatically set isBeingEdited to false when user
  // clicks outside the TodoItem component.

  const [wantsToDelete, setWantsToDelete] = useState<boolean>(false);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const detailsRef = useRef<HTMLParagraphElement>(null);

  const [todoTitle, setTodoTitle] = useState(" ");
  const [todoDetails, setTodoDetails] = useState(" ");

  const deleteTodo = (id: number) => {
    dispatch({ type: ActionsEnum.DELETE_TODO, payload: { id } });
    setWantsToDelete(false);
  };

  const completeTodo = (id: number) => {
    dispatch({ type: ActionsEnum.COMPLETE_TODO, payload: { id } });
  };

  const updateTodo = (id: number) => {
    dispatch({
      type: ActionsEnum.UPDATE_TODO,
      payload: { id, todoTitle, todoDetails },
    });
    setIsBeingEdited(false);
  };

  useEffect(() => {
    const currTitle = titleRef.current?.innerText as string;
    const currDetails = detailsRef.current?.innerText as string;
    setTodoTitle(currTitle);
    setTodoDetails(currDetails);
  }, []);

  return (
    <>
      <li key={todo.id}>
        <div
          className={
            isBeingEdited ? styles.todoItemBeingEdited : styles.todoItem
          }
          style={
            todo.completed
              ? {
                  backgroundColor: "lightgreen",
                  color: "gray",
                }
              : {}
          }
        >
          {isBeingEdited ? (
            <>
              <input
                className={styles.activeInput}
                type="text"
                value={todoTitle}
                onChange={(e) => setTodoTitle(e.target.value)}
                autoFocus={true}
              />
            </>
          ) : (
            <>
              <div className={styles.titleContainer}>
                <h2 ref={titleRef}>{todo.title}</h2>
                <span>{todo.completed ? "✅" : "⚡"}</span>
              </div>
            </>
          )}
          <div className={styles.detailsContainer}>
            {isBeingEdited ? (
              <>
                <textarea
                  className={styles.activeInputDetails}
                  value={todoDetails}
                  onChange={(e) => setTodoDetails(e.target.value)}
                  rows={10}
                  maxLength={250}
                />
              </>
            ) : (
              <>
                <p ref={detailsRef}>{todo.details}</p>
              </>
            )}
          </div>
          <div className={styles.buttonsContainer}>
            <button
              className={styles.delete}
              onClick={() => setWantsToDelete(true)}
              disabled={isBeingEdited}
            >
              Delete
            </button>
            <button
              className={
                !todo.completed ? styles.markasdone : styles.markinprogress
              }
              onClick={() => completeTodo(todo.id)}
              disabled={isBeingEdited}
            >
              {todo.completed ? "Mark as in-progress" : "Mark as done"}
            </button>
            {isBeingEdited ? (
              <button
                className={styles.edit}
                onClick={() => updateTodo(todo.id)}
                disabled={todoTitle === ""}
              >
                Save
              </button>
            ) : (
              <button
                className={styles.edit}
                onClick={() => setIsBeingEdited(!isBeingEdited)}
                disabled={todo.completed}
              >
                Edit
              </button>
            )}
          </div>
          {wantsToDelete ? <DeletionPrompt setWantsToDelete={setWantsToDelete} id={todo.id} deleteTodo={deleteTodo} /> : null}
        </div>
      </li>
    </>
  );
};

export default TodoItem;
