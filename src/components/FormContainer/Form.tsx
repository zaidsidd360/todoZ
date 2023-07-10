import { FormEvent, useState } from "react";
import { IAction } from "../../types/GlobalTypes";
import ActionsEnum from "../../data/ActionsEnum";
import styles from "./Form.module.css";

interface IFormProps {
  dispatch: React.Dispatch<IAction>;
}

const Form = ({ dispatch }: IFormProps) => {
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [todoDetails, setTodoDetails] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newTodo = {
      title: todoTitle,
      details: todoDetails,
      id: Math.floor(Math.random() * 1000 + 1),
      completed: false,
    };
    dispatch({ type: ActionsEnum.ADD_TODO, payload: { newTodo } });
    setTodoTitle("");
    setTodoDetails("");
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="todoTitle">Title</label>
      <input
        id="todoTitle"
        onChange={(e) => {
          setTodoTitle(e.target.value);
        }}
        value={todoTitle}
        type="text"
        placeholder="Enter a title"
        required
      />
      <label htmlFor="todoDetails">Details</label>
      <textarea
        id="todoDetails"
        onChange={(e) => {
          setTodoDetails(e.target.value);
        }}
        value={todoDetails}
        placeholder="Enter the details"
        rows={10}
        maxLength={250}
      />
      <button type="submit">Add task</button>
    </form>
  );
};

export default Form;
