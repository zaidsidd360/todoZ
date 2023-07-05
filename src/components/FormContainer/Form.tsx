import { FormEvent, useState } from "react";
import { ADD_TODO } from "../../reducers/TodoReducer";
import styles from "./Form.module.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Form = ({ dispatch }: any) => {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDetails, setTodoDetails] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newTodo = {
      title: todoTitle,
      details: todoDetails,
      id: Math.floor(Math.random() * 1000 + 1),
      completed: false,
    };
    dispatch({ type: ADD_TODO, payload: { newTodo } });
    setTodoTitle("");
    setTodoDetails("");
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        onChange={(e) => {
          setTodoTitle(e.target.value);
        }}
        value={todoTitle}
        type="text"
        placeholder="Title"
        required
      />
      <textarea
        onChange={(e) => {
          setTodoDetails(e.target.value);
        }}
        value={todoDetails}
        placeholder="Details"
      />
      <button type="submit">Add todo</button>
    </form>
  );
};

export default Form;
