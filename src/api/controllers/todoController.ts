import { Request, Response } from "express";

interface Todo {
  id: number;
  text: string;
}

class TodoController {
  todos: Todo[] = [];

  getAllTodos = (req: Request, res: Response) => {
    return res.status(200).json({
      message: "Fetched todos successfully.",
      todos: this.todos,
    });
  };

  addTodo = (req: Request, res: Response) => {
    const { text } = req.body;

    if (!text) {
      return res.status(400).send({
        message: "Bad request. Text is required.",
      });
    }

    const newTodo: Todo = {
      id: Date.now(),
      text,
    };

    this.todos.push(newTodo);

    return res.status(201).json({
      message: "Todo added successfully.",
      todo: newTodo,
    });
  };

  deleteTodo = (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        message: "Bad request. ID is required.",
      });
    }

    const index = this.todos.findIndex((todo) => todo.id === Number(id));

    if (index !== -1) {
      const deletedTodo = this.todos.splice(index, 1);
      return res.status(200).json({
        message: "Todo deleted successfully.",
        todo: deletedTodo,
      });
    } else {
      return res.status(404).json({
        message: "Todo not found.",
      });
    }
  };
}

export default new TodoController();
