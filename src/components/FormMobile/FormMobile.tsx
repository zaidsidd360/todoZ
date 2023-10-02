import { FormEvent, useRef, useState } from "react";
import ActionsEnum from "../../data/ActionsEnum";
import styles from "./FormMobile.module.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useClickOutside } from "@react-hooks-library/core";
import { IAction, ITodo } from "../../types/GlobalTypes";

interface IFormMobileProps {
  dispatch: React.Dispatch<IAction>;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

const FormMobile = ({ dispatch, setIsModalOpen }: IFormMobileProps) => {

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
      id: Math.floor(Math.random() * 1000 + 1),
    };
    dispatch({ type: ActionsEnum.ADD_TODO, payload: { newTodo } });
    setTodo(defaultTodo)
    setIsModalOpen(false);
  };

  const formRef = useRef(null);

  useClickOutside(formRef, () => {
    setIsModalOpen(false);
  });

  return (
    <>
      <div className={styles.modalBackdrop}>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className={styles.formMobile}
        >
          <label htmlFor="todoTitle">Title</label>
          <input
            id="todoTitle"
            onChange={handleChange}
            value={todo.title}
            name="title"
            type="text"
            placeholder="Enter a title"
            required
          />
          <label htmlFor="todoDetails">Details</label>
          <textarea
            id="todoDetails"
            onChange={handleChange}
            name="details"
            value={todo.details}
            placeholder="Enter the details"
            rows={10}
            maxLength={250}
          />
          <button type="submit">Add task</button>
        </form>
      </div>
    </>
  );
};

export default FormMobile;
