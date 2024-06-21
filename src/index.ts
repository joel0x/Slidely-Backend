import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import pingRoute from './routes/ping';
import submitRoute from './routes/submit';
import readRoute from './routes/read';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/ping', pingRoute);
app.use('/submit', submitRoute);
app.use('/read', readRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
