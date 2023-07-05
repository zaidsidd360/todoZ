import { TodoType, defaultTodos } from "../data/DefaultTodos";

export const CLEAR_TODOS = "CLEAR_TODOS";
export const DELETE_TODO = "DELETE_TODO";
export const COMPLETE_TODO = "COMPLETE_TODO";
export const RESET_TODOS = "RESET_TODOS";
export const ADD_TODO = "ADD_TODO";
export const UPDATE_TODO = "UPDATE_TODO";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const todoReducer = (state: any, action: any) => {
    switch (action.type) {
      case CLEAR_TODOS:
        return {
          ...state,
          todos: [],
        };
      case ADD_TODO:
        return {
          ...state,
          todos: [...state.todos, action.payload.newTodo]
        }
      case UPDATE_TODO:
        return {
          ...state,
          todos: state.todos.map((todo: TodoType)=> 
          todo.id === action.payload.id ? {...todo, title: action.payload.todoTitle, details: action.payload.todoDetails} : todo)
        }
      case DELETE_TODO:
        return {
          ...state,
          todos: state.todos.filter(
            (todo: TodoType) => todo.id !== action.payload.id
          ),
        };
      case COMPLETE_TODO:
        return {
          ...state,
          todos: state.todos.map((todo: TodoType) =>
            todo.id === action.payload.id
              ? { ...todo, completed: !todo.completed }
              : todo
          ),
        };
      case RESET_TODOS:
        return {
          ...state,
          todos: defaultTodos,
        };
    }
  };