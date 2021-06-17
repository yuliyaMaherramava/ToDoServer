import express from 'express';
import columnRouter from './column/columnRouter';
import taskRouter from './task/taskRouter';
import { connectToDB } from './utils/db';

const app = express();
const PORT = 8880;

connectToDB();

app.use('/tasks', taskRouter);
app.use('/columns', columnRouter);


app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

