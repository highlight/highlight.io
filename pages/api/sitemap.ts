import { GraphQLClient, gql } from 'graphql-request';
import { withHighlight } from '../../highlight.config';

async function handler(_: any, res: any) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/xml');

  // Instructing the Vercel edge to cache the file
  res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600');

  const graphcms = new GraphQLClient(
    'https://api-us-west-2.graphcms.com/v2/cl2tzedef0o3p01yz7c7eetq8/master',
    {
      headers: {
        Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
      },
    }
  );

  const { posts } = await graphcms.request(gql`
    query GetPosts() {
      posts(orderBy: publishedAt_DESC) {
        slug
      }
    }
  `);
  const blogPages = posts.map((post: any) => `blog/${post.slug}`);

  const staticPagePaths = process.env.staticPages?.split(', ') || [];
  const staticPages = staticPagePaths.map((path) => {
    return `${path.replace('pages', '').replace('index.tsx', '')}`;
  });

  const pages = [...staticPages, ...blogPages];

  const addPage = (page: string) => {
    return `    <url>
      <loc>${`${process.env.WEBSITE_URL}/${page}`}</loc>
      <changefreq>hourly</changefreq>
    </url>`;
  };

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(addPage).join('\n')}
  </urlset>`;

  res.end(xml);
}

export default withHighlight(handler);
