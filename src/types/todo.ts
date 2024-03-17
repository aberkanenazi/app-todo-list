export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export interface TodoStore {
  todos: Todo[];
  addTodo: (todoText: string) => void;
  removeTodo: (todoId: number) => void;
  toggleTodo: (todoId: number) => void;
  updateTodoText: (todoId: number, newText: string) => void;
}
