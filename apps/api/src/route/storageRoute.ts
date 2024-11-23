import express from "express";
import { StorageController } from "../controller/storageController";

const router = express.Router();
const storageController = new StorageController();

router.get('/storages', storageController.list);
router.get('/storages/:storageId', storageController.listById);
router.post('/storages', storageController.create);
router.put('/storages/:storageId', storageController.update);
router.delete('/storages/:storageId', storageController.delete);

export { router as storageRoutes }