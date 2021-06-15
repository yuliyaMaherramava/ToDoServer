import express from 'express';

const app = express();
const taskRouter = express.Router();

const tasksFile = [
    {
      '7ec18f24': {
        id: "7ec18f24",
        name: "task1",
        columnId: "1",
        createdAt: "2021-05-06T09:02:47.865Z"
      }
    },
    {
      '29aef68a': {
        id: "7ec18f24",
        name: "task2",
        columnId: "2",
        createdAt: "2021-06-07T09:02:47.865Z"
      }
    },
    {
      'cd112224': {
        id: "7ec18f24",
        name: "task3",
        columnId: "3",
        createdAt: "2021-06-08T09:02:47.865Z"
      },
    },
];

taskRouter.get('/', (req, res) => res.json(tasksFile));
taskRouter.post('/', (req, res) => res.json(req.body));
taskRouter.put('/:taskId', (req, res) => res.json(req.params));
taskRouter.delete('/:taskId', (req, res) => res.json({status:'ok'}));

export default taskRouter;