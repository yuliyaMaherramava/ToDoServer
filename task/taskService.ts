import { findTasks } from './taskRepository';

export async function getAllTasks() {
    return await findTasks();
}