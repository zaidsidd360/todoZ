import { useReducer } from "react";
import Form from "../FormContainer/Form";
import Todo from "../TodoContainer/Todo";
import { todoReducer } from "../../reducers/TodoReducer";
import defaultState from "../../data/DefaultState";
import styles from "./Container.module.css";
import { IAction, IState } from "../../types/GlobalTypes";

const Container = () => {
  const [state, dispatch] = useReducer<React.Reducer<IState, IAction>>(
    todoReducer,
    defaultState
  );

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <Todo state={state} dispatch={dispatch} />
        <Form dispatch={dispatch} />
      </div>
    </div>
  );
};

export default Container;
