import "reflect-metadata";
import { app } from './app'
import { databaseConnection } from "./database";

databaseConnection();

app.listen(3000, () => console.log('Server is running'));