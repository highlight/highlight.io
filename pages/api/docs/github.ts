import yaml from 'js-yaml';

const token = process.env.GITHUB_TOKEN;
const docsRoot = 'docs_content';
const githubHeaders = {
  accept: 'application/vnd.github+json',
  authorization: `Bearer ${token}`,
};

type GithubTree = {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  _links: {
    self: string;
    git: string;
    html: string;
  };
} & (
  | {
      type: 'dir';
      download_url: null;
    }
  | {
      type: 'file';
      download_url: string;
      content: string;
      encoding: 'base64';
    }
);

interface DocMeta {
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export const getGithubDocsPaths = async (path: string = docsRoot) => {
  const response = await fetch(
    `https://api.github.com/repos/highlight-run/highlight-landing/contents/${path}`,
    {
      headers: githubHeaders,
    }
  );
  const json = (await response.json()) as GithubTree[];
  const childPromises = [];
  let docs = new Map<string, DocMeta>();
  for (const path of json) {
    if (path.type === 'dir') {
      childPromises.push(getGithubDocsPaths(path.path));
    } else if (path.type === 'file') {
      const file = await fetch(path.download_url, {
        headers: { ...githubHeaders, accept: '' },
      });
      const text = await file.text();
      const sections = text.split('---');
      docs.set(
        path.path,
        yaml.load(sections[1], { schema: yaml.JSON_SCHEMA }) as DocMeta
      );
    }
  }
  for (const childDocs of await Promise.all(childPromises)) {
    for (const [path, doc] of childDocs.entries()) {
      docs.set(path, doc);
    }
  }
  return docs;
};

export const getGithubDoc = async (slug: string): Promise<DocMeta> => {
  const path = `${docsRoot}/${slug}.md`;
  const response = await fetch(
    `https://api.github.com/repos/highlight-run/highlight-landing/contents/${path}`,
    {
      headers: githubHeaders,
    }
  );
  if (response.ok) {
    const json = (await response.json()) as GithubTree;
    if (json.type === 'file') {
      const text = new Buffer(json.content, json.encoding).toString('ascii');
      const sections = text.split('---');
      return yaml.load(sections[1], { schema: yaml.JSON_SCHEMA }) as DocMeta;
    } else {
      throw Error(`slug ${slug} is a directory; expected a file`);
    }
  } else {
    return getGithubDoc(`${slug}/index`);
  }
};
