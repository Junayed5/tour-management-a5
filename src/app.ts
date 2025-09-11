import express, { Request, Response } from "express";
import { routers } from "./app/routes";

export const app = express();
app.use(express.json());

app.use('/api/v1', routers)

app.get('/', async(req:Request, res: Response) => {
    res.status(200).send({
        success: true,
        message: "Welcome to MYCASH wallet"
    })
})