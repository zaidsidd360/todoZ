import { useEffect, useRef, useState } from "react";
import {
  DELETE_TODO,
  COMPLETE_TODO,
  UPDATE_TODO,
} from "../../reducers/TodoReducer";
import styles from "./TodoItem.module.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TodoItem = ({ todo, dispatch }: any) => {
  // Lift this state to parent and add useClickOutside hook from react-hooks to automatically set this state to false when user clicks outside the TodoItem component.
  const [isBeingEdited, setIsBeingEdited] = useState(false);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const detailsRef = useRef<HTMLParagraphElement>(null);

  const [todoTitle, setTodoTitle] = useState(" ");
  const [todoDetails, setTodoDetails] = useState(" ");

  const deleteTodo = (id: number) => {
    dispatch({ type: DELETE_TODO, payload: { id } });
  };

  const completeTodo = (id: number) => {
    dispatch({ type: COMPLETE_TODO, payload: { id } });
  };

  const updateTodo = (id: number) => {
    console.log(todoTitle);

    dispatch({ type: UPDATE_TODO, payload: { id, todoTitle, todoDetails } });
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
      <li
        className={isBeingEdited ? styles.todoItemBeingEdited : styles.todoItem}
        key={todo.id}
        style={
          todo.completed ? { backgroundColor: "lightgreen", color: "gray" } : {}
        }
      >
        {isBeingEdited ? (
          <>
            <input
              className={styles.activeInput}
              type="text"
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
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
            onClick={() => deleteTodo(todo.id)}
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
            <button className={styles.edit} onClick={() => updateTodo(todo.id)}>
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
      </li>
    </>
  );
};

export default TodoItem;
