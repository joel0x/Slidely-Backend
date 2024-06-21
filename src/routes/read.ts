import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();
const dbPath = path.join(__dirname, '../../src/db.json');


router.get('/count', (req: Request, res: Response) => {
  fs.readFile(dbPath, (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error reading database' });
      return;
    }

    const db = JSON.parse(data.toString());
    res.status(200).json({ count: db.submissions.length });
  });
});


router.get('/', (req: Request, res: Response) => {
  const { index } = req.query;

  fs.readFile(dbPath, (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error reading database' });
      return;
    }

    const db = JSON.parse(data.toString());

 
    if (index !== undefined) {
      const idx = parseInt(index as string, 10);

      if (isNaN(idx) || idx < 0 || idx >= db.submissions.length) {
        res.status(404).json({ message: 'Submission not found' });
        return;
      }

      res.status(200).json(db.submissions[idx]);
    } else {
      res.status(200).json(db.submissions);
    }
  });
});

export default router;
