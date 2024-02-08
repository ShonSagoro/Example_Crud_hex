import { Express } from "express";
import { createUserController, logoutUserController, loginUserController, loginUseCase,  authService, getByIdController, updateUserController, deleteUserController, encryptionService, activateUserCase, activateUserController, listUsersController } from "../dependecies";
import {verifyToken} from "../middleware/verifyToken";
export function setupUserRoutes(app: Express) {
    app.post('/users', createUserController.execute.bind(createUserController));
    app.post('/users/login', loginUserController.execute.bind(loginUserController));
    app.get('/users/:id',verifyToken, getByIdController.execute.bind(getByIdController));
    app.put('/users/:id',verifyToken, updateUserController.execute.bind(updateUserController));
    app.delete('/users/:id',verifyToken, deleteUserController.execute.bind(deleteUserController));
    app.get('/users/activate/:uuid', activateUserController.execute.bind(activateUserController));
    app.get('/users/', listUsersController.execute.bind(listUsersController));
    app.get('/users/logout', verifyToken, logoutUserController.execute.bind(logoutUserController));
}