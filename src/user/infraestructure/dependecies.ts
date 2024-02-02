import { CreateUserCase } from "../application/CreateUserCase";
import { GetByUserCase } from "../application/GetByUserCase";
// import { UpdateUserCase } from "../application/UpdateUserCase";
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
import { MysqlUserRepository } from "./repositories/MysqlUserRepository";
// import { MongoDBUserRepository } from "./repositories/MongoUserRepository";

export const databaseRepository = new MysqlUserRepository();

export const createUserUseCase = new CreateUserCase(databaseRepository);
export const getUserUseCase = new GetByUserCase(databaseRepository);
export const updateUserUseCase = new UpdateUserUseCase(databaseRepository);
export const deleteUserUseCase = new DeleteUserCase(databaseRepository);
export const listUsersCase = new ListUsersCase(databaseRepository);

export const createUserController = new CreateUserController(createUserUseCase);
export const deleteUserController = new DeleteUserController(deleteUserUseCase);
export const getByIdController = new GetByIdController(getUserUseCase);
export const getByUsernameController = new GetByUsernameController(getUserUseCase);
export const getByEmailController = new GetByEmailController(getUserUseCase);
export const updateUserController = new UpdateUserController(updateUserUseCase);
export const listUsersController = new ListUsersController(listUsersCase);
