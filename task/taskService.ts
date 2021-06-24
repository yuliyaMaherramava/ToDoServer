import { findTasks, updateColumn, addTask, editTask, excludeTask, taskExists} from "./taskRepository";
import { columnExists } from "../column/columnRepository";
import { HttpError } from "../utils/error";


export async function getAllTasks() {
    return await findTasks();
}

export async function createTask(name: string, order: number, columnId:string) {
    const exist = await columnExists(columnId);
    if (exist){ 
        const newTask = await addTask(name, order, columnId);
        await updateColumn(columnId, newTask._id)
        return newTask;
    } else {
        throw new HttpError('Column doesnt exist', 404);
    }
}

export async function updateTask(id: string, name: string, order: number, columnId: string) {
    const exist = await taskExists(id);
    if (exist){ 
        return await editTask(id, name, order, columnId);
    } else {
        throw new HttpError('Task doesnt exist', 404);
    }
}

export async function deleteTask(id: string) {
    const exist = await taskExists(id);
    if (!exist){ 
        return await excludeTask(id);
    } else {
        throw new HttpError('Task doesnt exist', 404);
    }
}