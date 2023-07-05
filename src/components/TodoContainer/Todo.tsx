import styles from "./Todo.module.css";
import { TodoType } from "../../data/DefaultTodos";
import { CLEAR_TODOS, RESET_TODOS } from "../../reducers/TodoReducer";
import TodoItem from "../TodoItem/TodoItem";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Todo = ({ state, dispatch }: any) => {
  const clearTodos = () => {
    dispatch({ type: CLEAR_TODOS });
  };

  const resetTodos = () => {
    dispatch({ type: RESET_TODOS });
  };

  return state.todos.length === 0 ? (
    <div>
      No todos yet! Enjoy the day.{" "}
      <button className={styles.outsideBtn} onClick={resetTodos}>
        Reset to default
      </button>
    </div>
  ) : (
    <>
      <div className={styles.container}>
        <div className={styles.pseudoContainer}>
          <ol className={styles.todo}>
            {state.todos.map((todo: TodoType) => {
              return <TodoItem todo={todo} dispatch={dispatch} />;
            })}
          </ol>
          <div className={styles.pseudo}></div>
        </div>
        <button className={styles.outsideBtn} onClick={clearTodos}>
          Clear Todos
        </button>
        <button className={styles.outsideBtn} onClick={resetTodos}>
          Reset to default
        </button>
      </div>
    </>
  );
};

export default Todo;
