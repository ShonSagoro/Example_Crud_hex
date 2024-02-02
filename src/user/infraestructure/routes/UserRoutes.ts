import { Express } from "express";
import { createUserController, listUsersController, getByIdController, updateUserController, deleteUserController } from "../dependecies";

export function setupUserRoutes(app: Express) {
    app.get('/users', listUsersController.execute.bind(listUsersController));
    app.post('/users', createUserController.execute.bind(createUserController));
    app.get('/users/:id', getByIdController.execute.bind(getByIdController));
    app.put('/users/:id', updateUserController.execute.bind(updateUserController));
    app.delete('/users/:id', deleteUserController.execute.bind(deleteUserController));
}