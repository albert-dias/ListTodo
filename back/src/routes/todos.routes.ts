import { Router } from "express";

import { TodosController } from "../controllers/TodosController";

const todosRoutes = Router();
const todosController = new TodosController();

todosRoutes.get("/", todosController.list);
todosRoutes.get("/:id", todosController.show);
todosRoutes.post("/", todosController.create);
todosRoutes.put("/:id", todosController.update);
todosRoutes.delete("/:id", todosController.delete);


export { todosRoutes };
