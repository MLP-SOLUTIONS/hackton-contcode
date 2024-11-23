import express from "express";
import cors from "cors";
import { userRoutes, registerRoutes, authRoutes, storageRoutes } from "./route";
import { authMiddleware } from "./middleware";

const app = express();

app.use(express.json())
app.use(cors())
app.use('/api', registerRoutes);
app.use('/api', authRoutes);

app.use(authMiddleware());

app.use('/api', userRoutes)
app.use('/api', storageRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!');
});

export { app } 