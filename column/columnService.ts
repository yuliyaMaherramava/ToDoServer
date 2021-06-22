import { findColumns } from "./columnRepository";

export async function getAllColumns() {
    return await findColumns();
}
