import express from "express";
import { UserController } from "../controller/userController";

const router = express.Router();
const userController = new UserController();

router.get('/users', userController.list);
router.get('/users/:userId', userController.listById);
router.post('/users', userController.create);
router.put('/users/:userId', userController.update);
router.delete('/users/:userId', userController.delete);

export { router as userRoutes }