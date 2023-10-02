import { FormEvent, useState } from "react";
import { IAction, ITodo } from "../../types/GlobalTypes";
import ActionsEnum from "../../data/ActionsEnum";
import styles from "./Form.module.css";

interface IFormProps {
  dispatch: React.Dispatch<IAction>;
}

const Form = ({ dispatch }: IFormProps) => {

  const defaultTodo = {
    title: "",
    details: "",
    id: -1,
    completed: false
  }

  const [todo, setTodo] = useState<ITodo>(defaultTodo)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newTodo = {
      ...todo,
      id: Math.floor(Math.random() * 1000 + 1)
    };
    dispatch({ type: ActionsEnum.ADD_TODO, payload: { newTodo } });
    setTodo(defaultTodo)
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="title">Title</label>
      <input
        id="todoTitle"
        name="title"
        onChange={handleChange}
        value={todo.title}
        type="text"
        placeholder="Enter a title"
        required
      />
      <label htmlFor="details">Details</label>
      <textarea
        id="todoDetails"
        onChange={handleChange}
        name="details"
        value={todo.details}
        placeholder="Enter the details"
        rows={10}
        maxLength={350}
      />
      <button type="submit">Add task</button>
    </form>
  );
};

export default Form;
