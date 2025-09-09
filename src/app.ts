import express, { Request, Response } from "express";

export const app = express();

app.get('/', async(req:Request, res: Response) => {
    res.status(200).send({
        success: true,
        message: "Welcome to riding management"
    })
})