import { ColumnModel } from './columnEntity'; 

export async function findColumns() {
    const columns = await ColumnModel.find({_id:'60ca13bb724a3bbc3e5c27fd'}).populate('tasks').exec()
    return columns;
}