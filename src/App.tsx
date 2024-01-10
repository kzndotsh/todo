import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

interface Todo {
  id: number;
  text: string;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text: text,
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo: Todo) => todo.id !== id));
  };

  return (
    <Box p={4}>
      <AddTodo onAdd={addTodo} />
      <TodoList todos={todos} onDelete={deleteTodo} />
    </Box>
  );
};

export default App;
