import { promises as fsp } from 'fs';

export default function handler(req, res) {
  console.log(req.query);
  return res.json({});
}
