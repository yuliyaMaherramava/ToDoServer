import { ColumnModel } from './columnEntity'; 

export async function findColumns() {
    const columns = await ColumnModel.find({}).populate('tasks').exec()
    return columns;
}