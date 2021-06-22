import mongoose from "mongoose";
import { Task } from "./types/task";

export const taskSchema = new mongoose.Schema<Task>({
    name: String,
    order: Number,
    columnId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Column",
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: Date,
});

export const TaskModel = mongoose.model<Task>("Task", taskSchema);
