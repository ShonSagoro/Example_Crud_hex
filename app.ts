import express from 'express';
import { setupUserRoutes } from './src/user/infraestructure/routes/UserRoutes';
import morgan from 'morgan';
const app = express();

app.use(express.json()); // for parsing application/json
setupUserRoutes(app);
app.use(morgan('dev'))

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});