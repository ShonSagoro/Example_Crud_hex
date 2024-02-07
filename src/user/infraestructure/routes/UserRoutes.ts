import { Express } from "express";
import { createUserController, loginUserController, loginUseCase,  authService, getByIdController, updateUserController, deleteUserController, encryptionService } from "../dependecies";

export function setupUserRoutes(app: Express) {
    app.post('/users', createUserController.execute.bind(createUserController));
    app.post('/users/login', loginUserController.execute.bind(loginUseCase));
    app.get('/users/:id',authService.verifyToken, getByIdController.execute.bind(getByIdController));
    app.put('/users/:id',authService.verifyToken, updateUserController.execute.bind(updateUserController));
    app.delete('/users/:id',authService.verifyToken, deleteUserController.execute.bind(deleteUserController));
    app.get('/users/activate/:uuid', createUserController.execute.bind(createUserController));
}