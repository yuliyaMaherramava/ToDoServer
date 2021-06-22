import express from "express";
import { getAllColumns } from "./columnService";
import { ColumnModel } from "../column/columnEntity";

const columnRouter = express.Router();

columnRouter.get("/", async (req, res) => {
    const columns = await getAllColumns();
    res.json(columns);
});
columnRouter.post("/", async (req, res) => {
    await ColumnModel.create({
        name: req.body.name,
        order: req.body.order,
    });
    res.json({ message: "column created" });
});
columnRouter.put("/:columnId", async (req, res) => {
    await ColumnModel.updateOne(
        { _id: req.params.columnId },
        { name: req.body.name, order: req.body.order, updatedAt: new Date() }
    );
    res.json({ message: "column updated" });
});
columnRouter.delete("/:columnId", async (req, res) => {
    await ColumnModel.updateOne({ _id: req.params.columnId }, { deletedAt: new Date() });
    res.json({ message: "column deleted" });
});

export default columnRouter;
