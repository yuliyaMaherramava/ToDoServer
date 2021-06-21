import { HttpError } from "../utils/error";
import { addColumn, columnExists, findColumns, editColumn, excludeColumn } from "./columnRepository";

export async function getAllColumns() {
    return await findColumns();
}

export async function createColumn(name: string, order: number) {
    return await addColumn(name, order);
}

export async function updateColumn(id:string, name: string, order: number) {
    const isExisted = await columnExists(id);
    if (!isExisted){ 
        throw new HttpError('Column doesnt exist', 404);
    } else {
        return await editColumn(id, name, order);
    }
}

export async function deleteColumn(id: string) {
    const isExisted = await columnExists(id);
    if (!isExisted){ 
        throw new HttpError('Column doesnt exist', 404);
    } else {
        return await excludeColumn(id);
    }
}