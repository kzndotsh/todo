import React from "react";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

interface TodoItemProps {
  id: number;
  text: string;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, onDelete }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="6"
      borderRadius="md"
      borderWidth="1px"
    >
      <Text>{text}</Text>
      <IconButton
        aria-label="Delete todo"
        icon={<CloseIcon />}
        onClick={() => onDelete(id)}
      />
    </Box>
  );
};

export default TodoItem;
