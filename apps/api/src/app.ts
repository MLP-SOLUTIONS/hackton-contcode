import express from "express";
import cors from "cors";
import { userRoutes } from "./route";

const app = express();

app.use(express.json())
app.use(cors())
app.use('/api', userRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!');
});

export { app } 