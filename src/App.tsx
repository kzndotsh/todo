import React, { useState, useEffect } from "react";

import {
  Box,
  Input,
  Button,
  HStack,
  VStack,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";

import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

import { axiosInstance, toggleTodo, deleteTodo } from "./utils/axios";

import { Todo } from "./types";

interface AddTodoProps {
  onAdd: (title: string) => void;
}

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

const TodoItem: React.FC<{
  todo: Todo;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}> = ({ todo, onDelete, onToggle }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding="4"
      borderWidth="1px"
      borderRadius="md"
    >
      <Text
        as="p"
        fontSize="lg"
        textDecoration={todo.completed ? "line-through" : "none"}
      >
        {todo.title}
      </Text>

      <Box>
        <IconButton
          aria-label="Complete todo"
          icon={<CheckIcon />}
          onClick={() => onToggle(todo.id)}
          colorScheme="green"
          variant="ghost"
        />
        <IconButton
          aria-label="Delete todo"
          icon={<CloseIcon />}
          onClick={() => onDelete(todo.id)}
          colorScheme="red"
          variant="ghost"
        />
      </Box>
    </Box>
  );
};

const TodoList: React.FC<TodoListProps> = ({ todos, onDelete, onToggle }) => {
  return (
    <VStack spacing={4}>
      <Heading as="h2" size="lg">
        Todos
      </Heading>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </VStack>
  );
};

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title) return;
    onAdd(title.trim());
    setTitle("");
  };

  return (
    <HStack spacing={4}>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a new todo"
      />
      <Button onClick={handleAdd}>Add</Button>
    </HStack>
  );
};

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (title: string) => {
    axiosInstance
      .post("/todos", { title })
      .then((res) => setTodos((prevTodos) => [res.data, ...prevTodos]))
      .catch((err) => console.error(err));
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = async (id: number) => {
    try {
      const { data: updatedTodo } = await toggleTodo(id);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo)),
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axiosInstance.get("/todos");
        setTodos(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTodos();
  }, []);

  return (
    <Box padding="6">
      <AddTodo onAdd={handleAdd} />
      <TodoList todos={todos} onDelete={handleDelete} onToggle={handleToggle} />
    </Box>
  );
};

export default App;
