import express from 'express';
import columnRouter from './columns';
import taskRouter from './tasks';

const app = express();
const PORT = 8880;

app.use('/tasks', taskRouter);
app.use('/columns', columnRouter);


app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
