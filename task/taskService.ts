import { findTasks, updateColumn, addTask, editTask, excludeTask, taskExists} from "./taskRepository";
import { columnExists } from "../column/columnRepository";
import { HttpError } from "../utils/error";


export async function getAllTasks() {
    return await findTasks();
}

export async function createTask(name: string, order: number, columnId:string) {
    const isExisted = await columnExists(columnId);
    if (!isExisted){ 
        throw new HttpError('Column doesnt exist', 404);
    } else {
        const newTask = await addTask(name, order, columnId);
        await updateColumn(columnId, newTask._id)
        return newTask;
    }
}

export async function updateTask(id:string, name: string, order: number, columnId: string) {
    const isExisted = await taskExists(id);
    if (!isExisted){ 
        throw new HttpError('Task doesnt exist', 404);
    } else {
        return await editTask(id, name, order, columnId);
    }
}

export async function deleteTask(id:string) {
    const isExisted = await taskExists(id);
    if (!isExisted){ 
        throw new HttpError('Task doesnt exist', 404);
    } else {
        return await excludeTask(id);
    }
}