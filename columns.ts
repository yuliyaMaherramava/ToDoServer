import express from 'express';

const columnRouter = express.Router();

const columnsFile = [{
    1: {
      id: '1',
      name: 'To do',
      tasks: ['7ec18f24'],
      order: 1,
    }
  },
  {
    2: {
      id: '2',
      name: 'In progress',
      tasks: ['29aef68a'],
      order: 2,
    }
  },
  {
    3: {
      id: '3',
      name: 'Done',
      tasks: ['cd112224'],
      order: 3,
    }
  }
];

columnRouter.get('/', (req, res) => res.json(columnsFile));
columnRouter.post('/', (req, res) => res.json(req.body));
columnRouter.put('/:columnId', (req, res) => res.json(req.body));
columnRouter.delete('/:columnId', (req, res) => res.json({status:'ok'}));

export default columnRouter;