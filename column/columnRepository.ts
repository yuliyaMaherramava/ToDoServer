import { Types } from "mongoose";
import { ColumnModel } from "./columnEntity";

export async function findColumns() {
    return await ColumnModel.find({ deletedAt: { $exists: false } })
        .populate({ path: "tasks", match: { deletedAt: { $exists: false } } })
        .exec();
}

export async function addColumn(name: string, order: number) {
    return await ColumnModel.create({
        name: name,
        order: order,
    });
}

export async function columnExists(id:string) {
    return await ColumnModel.exists({ _id: Types.ObjectId(id) });
}

export async function editColumn(id:string, name: string, order: number) {
    return await ColumnModel.updateOne(
        { _id: id },
        {
            name,
            order,
            updatedAt: new Date()
        }
    );
}

export async function excludeColumn(id:string) {
    return await ColumnModel.updateOne({ _id: id}, { deletedAt: new Date() });
}