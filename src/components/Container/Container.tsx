import { useReducer, useState } from "react";
import Form from "../FormContainer/Form";
import Todo from "../TodoContainer/Todo";
import FormMobile from "../FormMobile/FormMobile";
import { todoReducer } from "../../reducers/TodoReducer";
import defaultState from "../../data/DefaultState";
import styles from "./Container.module.css";
import { IAction, IState } from "../../types/GlobalTypes";
import ActionsEnum from "../../data/ActionsEnum";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useMediaQuery } from "@react-hooks-library/core";

const Container = () => {
  const [state, dispatch] = useReducer<React.Reducer<IState, IAction>>(
    todoReducer,
    defaultState
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        {isMobile && (
          <div className={styles.mobBtnContainer}>
            <button onClick={() => dispatch({ type: ActionsEnum.RESET_TODOS })}>
              Reset
            </button>
            <button onClick={() => dispatch({ type: ActionsEnum.CLEAR_TODOS })}>
              Clear
            </button>
            <button onClick={() => setIsModalOpen(!isModalOpen)}>
              Create task
            </button>
          </div>
        )}
        <Todo state={state} dispatch={dispatch} />
        {!isMobile && <Form dispatch={dispatch} />}
        {isModalOpen && (
          <FormMobile dispatch={dispatch} setIsModalOpen={setIsModalOpen} />
        )}
      </div>
    </div>
  );
};

export default Container;
