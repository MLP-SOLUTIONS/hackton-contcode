import { UserController } from '../controller/userController';
import express from 'express';

const router = express.Router();
const userController = new UserController();

router.post('/register', userController.create.bind(userController));

export { router as registerRoutes }