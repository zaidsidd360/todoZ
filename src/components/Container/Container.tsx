import { useReducer } from "react";
import Form from "../FormContainer/Form";
import Todo from "../TodoContainer/Todo";
import styles from "./Container.module.css";
import { todoReducer } from "../../reducers/TodoReducer";
import { defaultState } from "../../data/DefaultState";

const Container = () => {
  const [state, dispatch] = useReducer(todoReducer, defaultState);
  return (
    <div className={styles.container}>
      <Todo state={state} dispatch={dispatch} />
      <Form dispatch={dispatch} />
    </div>
  );
};

export default Container;
