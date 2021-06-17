import mongoose from 'mongoose';
import { Task } from './types/task';
import {ColumnModel} from '../column/columnEntity';

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

export const TaskModel = mongoose.model<Task>('Task',taskSchema);

const newColumn = new ColumnModel({
    _id: new mongoose.Types.ObjectId(),
    name: 'Done',
    order: '3',
});
newColumn.save();

const newTask = new TaskModel({
    name: 'task4',
    order:1,
    columnId: newColumn._id,
    createdAt: new Date(),
});
newTask.save();