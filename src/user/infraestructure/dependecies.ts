import { CreateUserCase } from "../application/CreateUserCase";
import { GetByUserCase } from "../application/GetByUserCase";
import { UpdateUserUseCase } from "../application/UpdateUserCase";
import { DeleteUserCase } from "../application/DeleteUserCase";
import { ListUsersCase } from "../application/ListUsersCase";
import { CreateUserController } from "./controllers/CreateUserController";
import { DeleteUserController } from "./controllers/DeleteUserController";
import GetByEmailController from "./controllers/GetByEmailController";
import GetByIdController from "./controllers/GetByIdController";
import GetByUsernameController from "./controllers/GetByUsernameController";
import { UpdateUserController } from "./controllers/UpdateUserController";
import { ListUsersController } from "./controllers/ListUsersController";
import { ActivateUserCase } from "../application/ActivateUserCase";
import { ActivateUserController } from "./controllers/ActivateUserController";
// import { MysqlUserRepository } from "./repositories/MysqlUserRepository";
// import { MongoDBUserRepository } from "./repositories/MongoUserRepository";
import {SqliteUserRepository} from "./repositories/SqliteUserRepository";
import { NodemailerEmailService } from "./services/NodemailerEmailService";
import {  EncryptService} from "../domain/services/EncriptServices";
import { ByEncryptServices } from "./services/ByEncryptServices";
import { JWTAuthService } from "./services/JWTAuthServices";
import { LoginUserCase } from "../application/LoginUserCase";
import { LoginUserController } from "./controllers/LoginUserController";
export const databaseRepository = new SqliteUserRepository();

export const createUserUseCase = new CreateUserCase(databaseRepository);
export const getUserUseCase = new GetByUserCase(databaseRepository);
export const updateUserUseCase = new UpdateUserUseCase(databaseRepository);
export const deleteUserUseCase = new DeleteUserCase(databaseRepository);
export const listUsersCase = new ListUsersCase(databaseRepository);
export const activateUserCase = new ActivateUserCase(databaseRepository);
export const loginUseCase = new LoginUserCase(databaseRepository);
export const nodemailerEmailService = new NodemailerEmailService();

export const encryptionService = new ByEncryptServices();
export const authService = new JWTAuthService();


export const createUserController = new CreateUserController(createUserUseCase, nodemailerEmailService, encryptionService);
export const deleteUserController = new DeleteUserController(deleteUserUseCase);
export const getByIdController = new GetByIdController(getUserUseCase);
export const getByUsernameController = new GetByUsernameController(getUserUseCase);
export const getByEmailController = new GetByEmailController(getUserUseCase);
export const updateUserController = new UpdateUserController(updateUserUseCase);
export const listUsersController = new ListUsersController(listUsersCase);
export const activateUserController = new ActivateUserController(activateUserCase);
export const loginUserController = new LoginUserController(loginUseCase, encryptionService, authService);