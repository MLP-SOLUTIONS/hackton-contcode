import express from "express";
import { UserController } from "../controller/userController";

const router = express.Router();
const userController = new UserController();

router.get('/users', userController.list.bind(userController));
router.get('/users/:userId', userController.listById.bind(userController));
router.post('/users', userController.create.bind(userController));
router.put('/users/:userId', userController.update.bind(userController));
router.delete('/users/:userId', userController.delete.bind(userController));

export { router as userRoutes }