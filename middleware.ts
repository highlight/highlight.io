import { NextRequest, NextResponse } from 'next/server';

// this will redirect the domain landing page to the following page component
const SUBDOMAIN_LANDING_PAGES = {
  observability: '/blog/frontend-observability',
};

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hostname = req.headers.get('host');
  for (const [k, v] of Object.entries(SUBDOMAIN_LANDING_PAGES)) {
    if (hostname?.startsWith(`${k}.`)) {
      if (pathname === '/') {
        let url = req.nextUrl.origin || 'https://highlight.io/';
        url = url.replace(/\/+$/, '');
        // eslint-disable-next-line no-console
        console.log('domain rewrite', hostname, url, v);
        return NextResponse.rewrite(`${url}${v}`);
      }
    }
  }
}
