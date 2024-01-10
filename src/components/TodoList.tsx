import React from "react";
import { VStack, Heading } from "@chakra-ui/react";
import TodoItem from "./TodoItem";

interface Todo {
  id: number;
  text: string;
}

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDelete }) => {
  return (
    <VStack align="stretch" mt={4}>
      <Heading size="md">Your Todos</Heading>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          onDelete={onDelete}
        />
      ))}
    </VStack>
  );
};

export default TodoList;
