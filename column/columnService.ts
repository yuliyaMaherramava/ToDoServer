import { HttpError } from "../utils/error";
import { addColumn, columnExists, findColumns, editColumn, excludeColumn } from "./columnRepository";

export async function getAllColumns() {
    return await findColumns();
}

export async function createColumn(name: string, order: number) {
    return await addColumn(name, order);
}

export async function updateColumn(id:string, name: string, order: number) {
    const exist = await columnExists(id);
    if (exist){ 
       return await editColumn(id, name, order);
    } else {
        throw new HttpError('Column doesnt exist', 404);
    }
}

export async function deleteColumn(id: string) {
    const exist = await columnExists(id);
    if (exist){ 
        return await excludeColumn(id);
    } else {
        throw new HttpError('Column doesnt exist', 404);
    }
}