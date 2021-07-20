import express from "express";
import { body, validationResult } from 'express-validator';
import { getAllTasks, createTask, deleteTask } from "./taskService";
import { updateTask } from "./taskService";

const taskRouter = express.Router();

taskRouter.get("/", async (req, res, next) => {
    try{
        const tasks = await getAllTasks();
        res.json(tasks); 
    } catch(error) {
        next(error);
    }
});
taskRouter.post("/",
    body('name').not().isEmpty(),
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
            };
            const task = await createTask(req.body.name, req.body.order, req.body.columnId);
            res.send(task); 
        } catch(error) {
            next(error);
        }
});
taskRouter.put("/", async (req, res, next) => {
    try{
        await updateTask(req.body.id , req.body.name, req.body.order, req.body.columnId);
        res.json({ status: 'ok', message: 'Task was successfully updated' });
    } catch(error) {
        next(error);
    } 
});
taskRouter.delete("/", async (req, res, next) => {
    try{
        await deleteTask(req.body.id);
        res.json({ status: 'ok', message: 'Task was successfully deleted' });
    } catch(error) {
        next(error);
    }
});

export default taskRouter;

