import { UserController } from "../controller/userController";
import express from 'express';

const router = express.Router();
const userController = new UserController();

router.post('/auth', userController.login.bind(userController));

export { router as authRoutes }