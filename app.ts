import express from 'express';
import { setupUserRoutes } from './src/user/infraestructure/routes/UserRoutes';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const HOST:string = process.env.HOST_SERVER || 'localhost';
const PORT:number  = Number(process.env.PORT_SERVER) || 8080;

app.use(express.json()); // for parsing application/json
setupUserRoutes(app);
app.use(morgan('dev'))


app.listen(PORT, HOST, () => {
    console.log(`Server is running on host ${HOST} and port ${PORT}`);
});