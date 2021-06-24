import { Types } from 'mongoose';
import { TaskModel } from "./taskEntity";
import { ColumnModel } from "../column/columnEntity";

export async function findTasks() {
    return await TaskModel.find({ deletedAt: { $exists: false } }).exec();
}

export async function taskExists(id: string) {
    return await TaskModel.exists({ _id: Types.ObjectId(id) });
}

export async function updateColumn(id: string, taskId: string) {
    await ColumnModel.updateOne({ _id: id }, { $push: { tasks: taskId } });
}

export async function addTask(name: string, order: number, columnId: string) {
    return await TaskModel.create({
        name: name,
        order: order,
        columnId: columnId,
    }); 
}

export async function editTask(id: string, name: string, order: number, columnId: string) {
    await TaskModel.updateOne(
        { _id: id},
        {
            name: name, 
            order: order,
            columnId: columnId,
            updatedAt: new Date()
        }
    );
}

export async function excludeTask(id: string) {
    return await TaskModel.updateOne({ _id: id }, { deletedAt: new Date() });
}