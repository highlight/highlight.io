import { promises as fsp } from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getDocsPaths, readMarkdown } from '../../../docs/[[...doc]]';
import removeMd from 'remove-markdown';

const SEARCH_RESULT_BLURB_LENGTH = 60;
export interface SearchResult {
  title: string;
  path: string;
  content: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const searchValue = [req.query.searchValue].flat().join('').toLowerCase();
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
      path.title.toLowerCase().includes(searchValue) ||
      path.content.toLowerCase().includes(searchValue)
  );
  const searchResults = filteredResults.map((result) => {
    const parsedContent = removeMd(result.content);
    const firstOccurence = parsedContent.toLowerCase().indexOf(searchValue);
    return {
      ...result,
      content: `${
        firstOccurence - SEARCH_RESULT_BLURB_LENGTH > 0 ? '...' : ''
      }${parsedContent.slice(
        Math.max(0, firstOccurence - SEARCH_RESULT_BLURB_LENGTH),
        Math.min(firstOccurence + SEARCH_RESULT_BLURB_LENGTH)
      )}${
        firstOccurence + SEARCH_RESULT_BLURB_LENGTH < parsedContent.length
          ? '...'
          : ''
      }`,
    };
  });

  return res.json(searchResults);
}
