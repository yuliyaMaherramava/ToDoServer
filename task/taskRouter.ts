import express from 'express';
import { getAllTasks } from './taskService';
import { TaskModel } from '../task/taskEntity';

const taskRouter = express.Router();

taskRouter.get('/', async (req, res) => {
    const tasks = await getAllTasks();
    res.json(tasks);
});
taskRouter.post('/', (req, res) => {
    const newTask = new TaskModel({
        name: req.body.name,
        order: req.body.order,
        columnId: req.body.columnId,
    })
    newTask.save(function(err) {
        if (err){
            res.send(err);
        }
    })
    res.json({ message: 'task created'})
});
taskRouter.put('/:taskId', (req, res) => res.json(req.params));
taskRouter.delete('/:taskId', (req, res) => res.json({status:'ok'}));

export default taskRouter;