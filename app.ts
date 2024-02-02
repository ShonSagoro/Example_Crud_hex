import express from 'express';
import { setupUserRoutes } from './src/user/infraestructure/routes/UserRoutes';

const app = express();

app.use(express.json()); // for parsing application/json
setupUserRoutes(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});