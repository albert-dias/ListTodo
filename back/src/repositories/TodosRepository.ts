import { EntityRepository, Repository } from "typeorm";

import { Todos } from "../entities/Todos";

@EntityRepository(Todos)
class TodosRepository extends Repository<Todos> {}

export { TodosRepository };