import { AppDataSource } from "../data-source";
import { Control } from "../entity/Control";

export const controlRepository = AppDataSource.getRepository(Control);