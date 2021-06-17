import express from 'express';
import { getAllTasks } from './taskService';

const taskRouter = express.Router();

taskRouter.get('/', async (req, res) => {
    const tasks = await getAllTasks();
    res.json(tasks);
});
taskRouter.post('/', (req, res) => res.json(req.body));
taskRouter.put('/:taskId', (req, res) => res.json(req.params));
taskRouter.delete('/:taskId', (req, res) => res.json({status:'ok'}));

export default taskRouter;