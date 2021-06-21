import express from "express";
import { body, validationResult } from 'express-validator';
import { createColumn, deleteColumn, getAllColumns, updateColumn } from "./columnService";
import { HttpError } from "../utils/error";

const columnRouter = express.Router();

columnRouter.get("/", async (req, res) => {
    const columns = await getAllColumns();
    res.json(columns);
});
columnRouter.post("/",
    body('name').not().isEmpty(),
    async (req: express.Request, res: express.Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            await createColumn(req.body.name, req.body.order)
            res.json({ message: "column created" });
        } catch(error){
            if (error instanceof HttpError) {
                res.status(error.statusCode).send(error.message);
            } else {
                res.status(500).json({message: 'Server error'})
            }
        }
    });
columnRouter.put("/:columnId", async (req, res) => {
    try {
        await updateColumn(req.params.columnId , req.body.name, req.body.order);
        res.json({ message: "column updated" });
    } catch (error){
        if (error instanceof HttpError) {
            res.status(error.statusCode).send(error.message);
        } else {
            res.status(500).json({message: 'Server error'})
        }
    }
    // await ColumnModel.updateOne(
    //     { _id: req.params.columnId },
    //     { name: req.body.name, order: req.body.order, updatedAt: new Date() }
    // );
});
columnRouter.delete("/:columnId", async (req, res) => {
    try{
        await deleteColumn(req.params.columnId);
        res.json({ message: "column deleted" });
    } catch (error){
        if (error instanceof HttpError) {
            res.status(error.statusCode).send(error.message);
        } else {
            res.status(500).json({message: 'Server error'})
        }
    }
});

export default columnRouter;
