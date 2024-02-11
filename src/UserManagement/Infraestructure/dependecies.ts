import { SingUpUserCase } from "../Application/UseCase/SingUpUserCase";
import { GetByUserCase } from "../Application/UseCase/GetByUserCase";
import { UpdateUserUseCase } from "../Application/UseCase/UpdateUserCase";
import { DeleteUserCase } from "../Application/UseCase/DeleteUserCase";
import { ListUsersCase } from "../Application/UseCase/ListUsersCase";
import { SingInUserController } from "./Controllers/SingInUserController";
import { SingUpUserController } from "./Controllers/SingUpUserController";
import { SingOutUserController } from "./Controllers/SingOutUserController";
import { DeleteUserController } from "./Controllers/DeleteUserController";
import GetByEmailController from "./Controllers/GetByEmailController";
import GetByUuidController from "./Controllers/GetByUuidController";
import { UpdateUserController } from "./Controllers/UpdateUserController";
import { ListUsersController } from "./Controllers/ListUsersController";
import { ActivateUserCase } from "../Application/UseCase/ActivateUserCase";
import { ActivateUserController } from "./Controllers/ActivateUserController";
import { MysqlUserRepository } from "../Infraestructure/Repositories/MysqlUserRepository";
import { MongoDBUserRepository } from "../Infraestructure/Repositories/MongoUserRepository";
import { SqliteUserRepository } from "./Repositories/SqliteUserRepository";
import { NodemailerEmailService } from "./Services/NodemailerEmailService";
import { ByEncryptServices } from "./Services/ByEncryptServices";
import { JWTAuthService } from "./Services/JWTAuthServices";
import { SingInUserCase } from "../Application/UseCase/SingInUserCase";
import { SingOutUserCase } from "../Application/UseCase/SingOutUserCase";
import { TokenServices } from "./Services/TokenServices";

export const databaseRepository = new SqliteUserRepository();

export const encriptServices = new ByEncryptServices();
export const authService = new JWTAuthService();
export const nodemailerEmailService = new NodemailerEmailService();
export const tokenServices = new TokenServices();

export const singUpUserCase = new SingUpUserCase(databaseRepository);
export const getUserUseCase = new GetByUserCase(databaseRepository);
export const updateUserUseCase = new UpdateUserUseCase(databaseRepository);
export const deleteUserUseCase = new DeleteUserCase(databaseRepository);
export const listUsersCase = new ListUsersCase(databaseRepository);
export const activateUserCase = new ActivateUserCase(databaseRepository);
export const singInUserCase = new SingInUserCase(databaseRepository);
export const singOutUserCase = new SingOutUserCase(databaseRepository);



export const singInUserController = new SingInUserController(singInUserCase, encriptServices,authService, tokenServices);
export const singUpUserController = new SingUpUserController(singUpUserCase,nodemailerEmailService, encriptServices);
export const deleteUserController = new DeleteUserController(deleteUserUseCase);
export const getByUuidController = new GetByUuidController(getUserUseCase);
export const getByEmailController = new GetByEmailController(getUserUseCase);
export const updateUserController = new UpdateUserController(updateUserUseCase, encriptServices);
export const listUsersController = new ListUsersController(listUsersCase);
export const activateUserController = new ActivateUserController(activateUserCase);
export const singOutUserController = new SingOutUserController(singOutUserCase, authService);