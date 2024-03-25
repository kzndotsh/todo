import express from "express";

import {
  handleRequestGetTodos,
  handleRequestGetTodo,
  handleRequestAddTodo,
  handleRequestDeleteTodo,
  handleRequestUpdateTodo,
  handleRequestToggleTodo,
} from "../controllers/todoController";

const router = express.Router();

router.get("/", handleRequestGetTodos);
router.get("/:id", handleRequestGetTodo);
router.post("/", handleRequestAddTodo);
router.delete("/:id", handleRequestDeleteTodo);
router.put("/:id", handleRequestUpdateTodo);
router.patch("/:id", handleRequestToggleTodo);

export default router;
