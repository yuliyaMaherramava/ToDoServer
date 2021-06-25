import express from "express";
import { body, validationResult } from 'express-validator';
import { createColumn, deleteColumn, getAllColumns, updateColumn } from "./columnService";

const columnRouter = express.Router();

columnRouter.get("/", async (req, res, next) => {
    try{
        const columns = await getAllColumns();
        res.json(columns);
        next();
    } catch(error) {
        next(error);
    }
});
columnRouter.post("/",
    body('name').not().isEmpty(),
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            await createColumn(req.body.name, req.body.order);
            res.json({ status: 'ok', message: 'Column was successfully created' });
        } catch(error) {
            next(error);
        }
});
columnRouter.put("/:columnId", async (req, res, next) => {
    try {
        await updateColumn(req.params.columnId , req.body.name, req.body.order);
        res.json({ status: 'ok', message: 'Column was successfully updated' });
    } catch(error) {
        next(error);
    }
});
columnRouter.delete("/:columnId", async (req, res, next) => {
    try{
        await deleteColumn(req.params.columnId);
        res.json({ status: 'ok', message: 'Column was successfully deleted' });
    } catch(error) {
        next(error);
    }
});

export default columnRouter;
