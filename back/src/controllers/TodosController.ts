import { Request, Response } from "express";
import CreateTodoService from "../services/CreateTodoService";
import DeleteTodoService from "../services/DeleteTodoService";
import ListTodoService from "../services/ListTodoService";
import ShowTodoService from "../services/ShowTodoService";
import UpdateTodoService from "../services/UpdateTodoService";

class TodosController {
  async list(req: Request, res: Response): Promise<Response> {
    try {
      const todoService = new ListTodoService();
      const todos = await todoService.execute();
      
      return res.status(201).json(todos);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    try {
      const todoService = new ShowTodoService();
      const todo = await todoService.execute({id: Number(id)});
      return res.status(201).json(todo);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const {title, description} = req.body;

      const todoService = new CreateTodoService();

      const todo = await todoService.execute({title, description})

      return res.status(201).json(todo);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    const {id} = req.params;
    try {
      const todoService = new UpdateTodoService();
      const todo = await todoService.execute({id: Number(id)});
      return res.status(201).json(todo);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const {id} = req.params;
    try {
      const todoService = new DeleteTodoService();
      await todoService.execute({id: Number(id)});

      return res.status(201).json();
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  
}
export { TodosController };
