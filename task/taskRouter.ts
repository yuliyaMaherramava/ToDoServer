import express from "express";
import { getAllTasks } from "./taskService";
import { TaskModel } from "../task/taskEntity";
import { ColumnModel } from "../column/columnEntity";

const taskRouter = express.Router();

taskRouter.get("/", async (req, res) => {
    const tasks = await getAllTasks();
    res.json(tasks);
});
taskRouter.post("/", async (req, res) => {
    const newTask = await TaskModel.create({
        name: req.body.name,
        order: req.body.order,
        columnId: req.body.columnId,
    });
    await ColumnModel.updateOne({ _id: req.body.columnId }, { $push: { tasks: newTask._id } });
    res.json({ message: "task created" });
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
