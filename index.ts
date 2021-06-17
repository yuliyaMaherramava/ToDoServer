import express from "express";
import columnRouter from "./column/columnRouter";
import taskRouter from "./task/taskRouter";
import { connectToDB } from "./utils/db";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

connectToDB();

app.use(express.json());
app.use("/tasks", taskRouter);
app.use("/columns", columnRouter);

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
