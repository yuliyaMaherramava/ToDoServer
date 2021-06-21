import express from "express";
import { Types } from 'mongoose';
import { body, validationResult } from 'express-validator';
import { getAllTasks } from "./taskService";
import { TaskModel } from "../task/taskEntity";
import { ColumnModel } from "../column/columnEntity";

const taskRouter = express.Router();

taskRouter.get("/", async (req, res) => {
    const tasks = await getAllTasks();
    res.json(tasks);
});
taskRouter.post("/",
    body('name').not().isEmpty(),
    body('columnId').not().isEmpty(),
    async (req: express.Request, res: express.Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        };
        const columnExists = await ColumnModel.exists({ _id: Types.ObjectId(req.body.columnId) });

        if (columnExists){ 
            const newTask = await TaskModel.create({
                name: req.body.name,
                order: req.body.order,
                columnId: req.body.columnId,
                }); 
            await ColumnModel.updateOne({ _id: req.body.columnId }, { $push: { tasks: newTask._id } });
            res.send(newTask);
        } else {
            res.status(400).json({message:'column isnt found'});
        }
});
taskRouter.put("/:taskId", async (req, res) => {
    await TaskModel.updateOne(
        { _id: req.params.taskId },
        { name: req.body.name, order: req.body.order, updatedAt: new Date() }
    );
    res.json({ message: "task updated" });
});
taskRouter.delete("/:taskId", async (req, res) => {
    await TaskModel.updateOne({ _id: req.params.taskId }, { deletedAt: new Date() });
    res.json({ message: "task deleted" });
});

export default taskRouter;
