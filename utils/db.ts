import mongoose from "mongoose";

export function connectToDB() {
    const { DB_HOST, DB_PORT, DB_NAME } = process.env;
    mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function () {
        console.log("we are connected!");
    });
}
