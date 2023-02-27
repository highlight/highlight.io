import type { NextApiRequest, NextApiResponse } from 'next'
import { quickStartContent } from '../../components/QuickstartContent/QuickstartContent'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(quickStartContent)
}
