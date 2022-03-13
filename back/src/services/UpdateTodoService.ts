import { Repository, getCustomRepository } from "typeorm";
import { Todos } from "../entities/Todos";
import { TodosRepository } from "../repositories/TodosRepository";

interface IRequest {
  id: number;
}

class UpdateTodoService {
  private todosRepository: Repository<Todos>;

  constructor() {
    this.todosRepository = getCustomRepository(TodosRepository);
  }

  public async execute({id}: IRequest): Promise<Todos> {
    if (!id) {
      throw new Error("Incomplete data");
    }

  
    const todo = await this.todosRepository.findOne({ id })
   
    todo.status = 1;

    await this.todosRepository.save(todo);

    return todo;
  }
}

export default UpdateTodoService;
