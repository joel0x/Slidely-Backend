import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();
const dbPath = path.join(__dirname, '../../src/db.json');

router.post('/', (req: Request, res: Response) => {
  const { name, email, phone, github_link, stopwatch_value } = req.body;

  fs.readFile(dbPath, (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error reading database' });
      return;
    }

    const db = JSON.parse(data.toString());
    db.submissions.push({ name, email, phone, github_link, stopwatch_value });

    fs.writeFile(dbPath, JSON.stringify(db), (err) => {
      if (err) {
        res.status(500).json({ message: 'Error saving to database' });
        return;
      }

      res.status(200).json({ message: 'Submission saved successfully' });
    });
  });
});

export default router;
