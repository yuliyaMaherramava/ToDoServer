import { TaskModel } from "./taskEntity";

export async function findTasks() {
    return await TaskModel.find({ deletedAt: { $exists: false } }).exec();
}
