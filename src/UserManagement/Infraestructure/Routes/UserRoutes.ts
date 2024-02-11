import { Express } from "express";
import {VerifyToken} from "../../../Middleware/verifyToken";
import { activateUserController, deleteUserController, getByUuidController, listUsersController, singInUserController, singOutUserCase, singOutUserController, singUpUserController, updateUserController } from "../dependecies";
export function setupUserRoutes(app: Express) {
    app.post('/users/sing_up', singUpUserController.execute.bind(singUpUserController));
    app.post('/users/sing_in', singInUserController.execute.bind(singInUserController));
    app.get('/users/:uuid',VerifyToken, getByUuidController.execute.bind(getByUuidController));
    app.put('/users/:uuid',VerifyToken, updateUserController.execute.bind(updateUserController));
    app.delete('/users/:uuid',VerifyToken, deleteUserController.execute.bind(deleteUserController));
    app.get('/users/activate/:uuid', activateUserController.execute.bind(activateUserController));
    app.get('/users/', listUsersController.execute.bind(listUsersController));
    app.get('/users/sing_out/:uuid', VerifyToken, singOutUserController.execute.bind(singOutUserController));
}