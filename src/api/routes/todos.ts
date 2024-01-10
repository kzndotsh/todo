import express from "express";
import TodoController from "../controllers/todoController";

const router = express.Router();

router.get("/", TodoController.getAllTodos);
router.post("/", TodoController.addTodo);
router.delete("/:id", TodoController.deleteTodo);

export default router;
