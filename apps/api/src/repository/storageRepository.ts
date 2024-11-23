import { Storage } from "../entity/Storage";
import { AppDataSource } from "../data-source";

export const storageRepository = AppDataSource.getRepository(Storage);