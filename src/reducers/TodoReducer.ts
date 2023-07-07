import { IAction, IState, ITodo } from "../types/GlobalTypes";
import defaultTodos from "../data/DefaultTodos";
import ActionsEnum from "../data/ActionsEnum";

export const todoReducer = (state: IState, action: IAction): IState => {
  const {type, payload} = action;
  switch (type) {
    case ActionsEnum.CLEAR_TODOS:
      return {
        ...state,
        todos: [],
      };
    case ActionsEnum.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, payload?.newTodo as ITodo]
      }
    case ActionsEnum.UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo: ITodo) => 
          todo?.id === payload?.id 
            ? {...todo, title: payload?.todoTitle as string, details: payload?.todoDetails} 
            : todo
          )
      }
    case ActionsEnum.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(
          (todo: ITodo) => todo?.id !== payload?.id
        ),
      };
    case ActionsEnum.COMPLETE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo: ITodo) =>
          todo?.id === payload?.id
            ? { ...todo, completed: !todo?.completed }
            : todo
        ),
      };
    case ActionsEnum.RESET_TODOS:
      return {
        ...state,
        todos: defaultTodos,
      };
    default:
      return state;
  }
};