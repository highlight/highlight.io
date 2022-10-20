import { promises as fsp } from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getDocsPaths, readMarkdown } from '../../../docs/[[...doc]]';

export interface SearchResult {
  title: string;
  path: string;
  content: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const searchValue = [req.query.searchValue].flat().join('');
  const docPaths = await getDocsPaths(fsp, undefined);
  const paths: SearchResult[] = await Promise.all(
    docPaths.map(async (doc) => {
      const { content } = await readMarkdown(
        fsp,
        path.join(doc?.total_path || '')
      );
      return {
        title: doc?.metadata.title,
        path: doc?.simple_path,
        content: content,
      };
    })
  );
  const filteredResults = paths.filter(
    (path) =>
      path.title.includes(searchValue) || path.content.includes(searchValue)
  );

  return res.json(filteredResults);
}
