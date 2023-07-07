import TodoItem from "../TodoItem/TodoItem";
import { IAction, IState, ITodo } from "../../types/GlobalTypes";
import ActionsEnum from "../../data/ActionsEnum";
import styles from "./Todo.module.css";

interface ITodoProps {
  state: IState;
  dispatch: React.Dispatch<IAction>;
}

const Todo = ({ state, dispatch }: ITodoProps) => {
  const clearTodos = () => {
    dispatch({ type: ActionsEnum.CLEAR_TODOS });
  };

  const resetTodos = () => {
    dispatch({ type: ActionsEnum.RESET_TODOS });
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
        <ol className={styles.todo}>
          {state.todos.map((todo: ITodo) => {
            return <TodoItem todo={todo} dispatch={dispatch} />;
          })}
        </ol>
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
