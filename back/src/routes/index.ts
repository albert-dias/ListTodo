import {Router} from "express";
import { todosRoutes } from "./todos.routes";

const routes = Router();

routes.use('/todos', todosRoutes)

export default routes;