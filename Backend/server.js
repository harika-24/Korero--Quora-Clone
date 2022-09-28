import express from 'express';
import cors from 'cors';
import feed from './api/routes.js';

const app = express();

app.use(cors());
app.use(express.json());

//acessing the routes
app.use("/api/v1/home", feed);

app.use("/api/v1/home/health", (req, res) => {
    res.sendStatus(200);
})

app.use("*", (req, res) => {
    res.status(404).json({ error: "not found" });
})



export default app;