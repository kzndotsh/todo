import React, { useState } from "react";
import { Input, Button, HStack } from "@chakra-ui/react";

interface AddTodoProps {
  onAdd: (text: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText(""); // reset input field after submit
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack mt="8">
        <Input
          variant="filled"
          placeholder="Learn TypeScript..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button colorScheme="teal" px="8" type="submit">
          Add Todo
        </Button>
      </HStack>
    </form>
  );
};

export default AddTodo;
