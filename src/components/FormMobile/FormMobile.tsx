import { FormEvent, useRef, useState } from "react";
import ActionsEnum from "../../data/ActionsEnum";
import styles from "./FormMobile.module.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useClickOutside } from "@react-hooks-library/core";
import { IAction } from "../../types/GlobalTypes";

interface IFormMobileProps {
  dispatch: React.Dispatch<IAction>;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

const FormMobile = ({ dispatch, setIsModalOpen }: IFormMobileProps) => {
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
      </div>
    </>
  );
};

export default FormMobile;
