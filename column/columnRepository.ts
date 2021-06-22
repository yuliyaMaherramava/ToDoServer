import { ColumnModel } from "./columnEntity";

export async function findColumns() {
    return await ColumnModel.find({ deletedAt: { $exists: false } })
        .populate({ path: "tasks", match: { deletedAt: { $exists: false } } })
        .exec();
}
