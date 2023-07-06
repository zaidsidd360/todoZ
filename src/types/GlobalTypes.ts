interface ITodo {
  title: string;
  details?: string;
  id: number;
  completed: boolean;
} 

interface IAction {
  type: string;
  payload?: {
    id?: number;
    todoTitle?: string;
    todoDetails?: string;
    newTodo?: ITodo;
  }
}

interface IState {
  todos: ITodo[]
}

export type { ITodo, IAction, IState };