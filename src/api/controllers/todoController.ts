import { Request, Response } from "express";
import {
  handleQueryGetTodos,
  handleQueryGetTodo,
  handleQueryAddTodo,
  handleQueryDeleteTodo,
  handleQueryUpdateTodo,
  handleQueryToggleTodo,
} from "../models/todoModel";

export const handleRequestGetTodos = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const todos = await handleQueryGetTodos();

    res.status(200).json(todos);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const handleRequestGetTodo = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID" });
      return;
    }

    const todo = await handleQueryGetTodo(id);

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    res.status(200).json(todo);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const handleRequestAddTodo = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { title } = req.body;

    if (!title) {
      res.status(400).json({ message: "Title is required" });
      return;
    }

    const todo = await handleQueryAddTodo(title);

    res.status(201).json(todo);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const handleRequestDeleteTodo = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID" });
      return;
    }

    const todo = await handleQueryDeleteTodo(id);

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    res.status(200).json(todo);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const handleRequestUpdateTodo = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const { title, completed } = req.body;

    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID" });
      return;
    }

    if (!title && completed === undefined) {
      res.status(400).json({ message: "Title or completed is required" });
      return;
    }

    const todo = await handleQueryUpdateTodo(id, title);

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    res.status(200).json(todo);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const handleRequestToggleTodo = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID" });
      return;
    }

    const todo = await handleQueryToggleTodo(id);

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    res.status(200).json(todo);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
