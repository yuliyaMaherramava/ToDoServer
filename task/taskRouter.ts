import express from "express";
import { Types } from 'mongoose';
import { body, validationResult } from 'express-validator';
import { getAllTasks, createTask, deleteTask } from "./taskService";
import { HttpError } from "../utils/error";
import { updateTask } from "./taskService";

const taskRouter = express.Router();

taskRouter.get("/", async (req, res) => {
    const tasks = await getAllTasks();
    res.json(tasks);
});
taskRouter.post("/",
    body('name').not().isEmpty(),
    body('columnId').not().isEmpty(),
    async (req: express.Request, res: express.Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
            };
            const task = await createTask(req.body.name, req.body.order, req.body.columnId);
            res.send(task);
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.statusCode).send(error.message);
            } else {
                res.status(500).json({message: 'Server error'})
            }
        }
});
taskRouter.put("/:taskId", async (req, res) => {
    try {
        await updateTask(req.params.taskId , req.body.name, req.body.order, req.body.columnId);
        res.json({ message: "task updated" });
    } catch (error){
        if (error instanceof HttpError) {
            res.status(error.statusCode).send(error.message);
        } else {
            res.status(500).json({message: 'Server error'})
        }
    }
});
taskRouter.delete("/:taskId", async (req, res) => {
    try{
        await deleteTask(req.params.taskId);
        res.json({ message: "task deleted" });
    } catch (error){
        if (error instanceof HttpError) {
            res.status(error.statusCode).send(error.message);
        } else {
            res.status(500).json({message: 'Server error'})
        }
    }
});

export default taskRouter;
