import express from 'express';
import { getAllColumns } from './columnService';

const columnRouter = express.Router();

columnRouter.get('/', async (req, res) => {
    const columns = await getAllColumns();
    res.json(columns);
});
columnRouter.post('/', (req, res) => res.json(req.body));
columnRouter.put('/:columnId', (req, res) => res.json(req.params));
columnRouter.delete('/:columnId', (req, res) => res.json({status:'ok'}));

export default columnRouter;