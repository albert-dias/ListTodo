import { Repository, getCustomRepository } from "typeorm";
import { Todos } from "../entities/Todos";
import { TodosRepository } from "../repositories/TodosRepository";

interface IRequest {
  title: string;
  description: string;
}

class CreateTodoService {
  private todosRepository: Repository<Todos>;

  constructor() {
    this.todosRepository = getCustomRepository(TodosRepository);
  }

  public async execute({
    title,
    description,
  }: IRequest): Promise<Todos> {
    if (!title || !description) {
      throw new Error("Incomplete data");
    }

    const todo = this.todosRepository.create({ title, description, status: 0 })
   

    await this.todosRepository.save(todo);

    return todo;
  }
}

export default CreateTodoService;
