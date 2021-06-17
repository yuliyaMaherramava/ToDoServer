import mongoose from "mongoose";
import { Column } from "./types/column";

const columnSchema = new mongoose.Schema<Column>({
    name: String,
    order: Number,
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
        },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: Date,
});

export const ColumnModel = mongoose.model<Column>("Column", columnSchema);
