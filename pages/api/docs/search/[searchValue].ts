import { promises as fsp } from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';
import { readMarkdown } from '../../../docs/[[...doc]]';

const DOCS_CONTENT_PATH = path.join(process.cwd(), 'docs_content');

export interface SearchResult {
  title: string;
  path: string;
  content: string;
}
const getDocsPaths = async (
  fs_api: any,
  base: string | undefined
): Promise<SearchResult[]> => {
  if (!base) {
    base = '';
  }
  const full_path = path.join(DOCS_CONTENT_PATH, base);
  const read = await fs_api.readdir(full_path);

  let paths: SearchResult[] = [];
  for (var i = 0; i < read.length; i++) {
    const file_string = read[i];
    let total_path = path.join(full_path, file_string);
    const file_path = await fs_api.stat(total_path);
    if (file_path.isDirectory()) {
      paths = paths.concat(
        await getDocsPaths(fs_api, path.join(base, file_string))
      );
    } else {
      let pp = '';
      let simple_path = path.join(base, file_string);
      if (file_string === 'index.md') {
        // get rid of "index.md" at the end
        pp = simple_path.split('/').slice(0, -1).join('/');
      } else {
        // strip out any notion of ".md"
        pp = simple_path.replace('.md', '');
      }
      const { data, content } = await readMarkdown(
        fsp,
        path.join(total_path || '')
      );
      paths.push({
        title: data.title,
        path: pp,
        content: content,
      });
    }
  }
  return paths;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const searchValue = [req.query.searchValue].flat().join('');
  const paths = await getDocsPaths(fsp, undefined);
  const filteredResults = paths.filter(
    (path) =>
      path.title.includes(searchValue) || path.content.includes(searchValue)
  );

  return res.json(filteredResults);
}
