import { Repository, getCustomRepository } from "typeorm";
import { Todos } from "../entities/Todos";
import { TodosRepository } from "../repositories/TodosRepository";

class ListTodoService {
  private todosRepository: Repository<Todos>;

  constructor() {
    this.todosRepository = getCustomRepository(TodosRepository);
  }

  public async execute(): Promise<Todos[]> {
    const todo = await this.todosRepository.find()
   
    return todo;
  }
}

export default ListTodoService;
