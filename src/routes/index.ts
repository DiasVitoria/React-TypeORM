import { Router, Request, Response } from "express";
import spent from './spent';
import UserController from "../controllers/UserController";

const routes = Router();

routes.post("/login", UserController.login);

//aceita qualquer método HTTP ou URL
routes.use( (req:Request,res:Response) => res.json({error:"Requisição desconhecida"}) );

export default routes;
