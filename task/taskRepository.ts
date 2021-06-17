import { TaskModel } from './taskEntity'; 

export async function findTasks() {
    const tasks = await TaskModel.find({}).exec();
    return tasks;
}