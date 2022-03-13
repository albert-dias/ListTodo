import { Repository, getCustomRepository } from "typeorm";
import { Todos } from "../entities/Todos";
import { TodosRepository } from "../repositories/TodosRepository";

interface IRequest {
  id: number;
}

class DeleteTodoService {
  private todosRepository: Repository<Todos>;

  constructor() {
    this.todosRepository = getCustomRepository(TodosRepository);
  }

  public async execute({id}: IRequest): Promise<Todos> {
    if (!id) {
      throw new Error("Incomplete data");
    }

  
    const todo = this.todosRepository.findOne({id});

    if(todo){
      await this.todosRepository.delete({id})
    }  

    return
  }
}

export default DeleteTodoService;
