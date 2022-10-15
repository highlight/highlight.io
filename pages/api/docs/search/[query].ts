import { promises as fsp } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.query);
  return res.json({});
}
