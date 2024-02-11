import express from 'express';
import { setupUserRoutes } from './src/UserManagement/Infraestructure/Routes/UserRoutes';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const apiRouter = express.Router();


const HOST:string = process.env.HOST_SERVER || 'localhost';
const PORT:number  = Number(process.env.PORT_SERVER) || 8080;

app.use(express.json()); 
setupUserRoutes(app);
app.use('/api/v1', app);
app.use(morgan('dev'))

app.listen(PORT, HOST, () => {
    console.log(`Server is running on host ${HOST} and port ${PORT}`);
});