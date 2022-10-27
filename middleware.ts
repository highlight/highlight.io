import { NextRequest, NextResponse } from 'next/server';

// this will redirect the domain landing page to the following page component
const SUBDOMAIN_LANDING_PAGES = {
  observability: '/blog/frontend-observability',
  monitor: '/blog/frontend-observability',
  nextjs: '/blog/feature-nextjs-integration',
  nodejs: '/blog/feature-nodejs-integration',
};

export const DOCS_REDIRECTS = {
  'client-sdk': '/docs/getting-started/client-sdk',
  reactjs: '/docs/getting-started/client-sdk/reactjs',
  nextjs: '/docs/getting-started/client-sdk/nextjs',
  vuejs: '/docs/getting-started/client-sdk/vuejs',
  gatsbyjs: '/docs/getting-started/client-sdk/gatsbyjs',
  sveltekit: '/docs/getting-started/client-sdk/sveltekit',
  angular: '/docs/getting-started/client-sdk/angular',
  html: '/docs/getting-started/client-sdk/html',
  wordpress: '/docs/getting-started/client-sdk/wordpress',
  shopify: '/docs/getting-started/client-sdk/shopify',
  webflow: '/docs/getting-started/client-sdk/webflow',
  squarespace: '/docs/getting-started/client-sdk/squarespace',
  other: '/docs/getting-started/client-sdk/other',
  'backend-sdk': '/docs/getting-started/backend-sdk',
  'nodejs-backend': '/docs/getting-started/backend-sdk/nodejs',
  'express-backend': '/docs/getting-started/backend-sdk/nextjs',
  'nextjs-backend': '/docs/getting-started/backend-sdk/express',
  'go-backend': '/docs/getting-started/backend-sdk/go',
  'nextjs-sdk': '/docs/getting-started/backend-sdk/nextjs',
  metrics: '/docs/getting-started/nextjs-sdk/metrics',
  'performance-impact': '/docs/tips/performance-impact',
  'upgrading-highlight': '/docs/tips/upgrading-highlight',
  'local-development': '/docs/tips/local-development',
  troubleshooting: '/docs/tips/troubleshooting',
  'monkey-patches': '/docs/tips/monkey-patches',
  'proxying-highlight': '/docs/tips/proxying-highlight',
  'session-search-deep-linking': '/docs/tips/sessions-search-deep-linking',
  'content-security-policy': '/docs/tips/content-security-policy',
  privacy: '/docs/session-replay/privacy',
  'recording-network-requests-and-responses':
    '/docs/session-replay/recording-network-requests-and-responses',
  'identifying-users': '/docs/session-replay/identifying-sessions',
  'tracking-events': '/docs/session-replay/tracking-events',
  'versioning-sessions': '/docs/session-replay/versioning-sessions',
  'rage-clicks': '/docs/session-replay/rage-clicks',
  'network-devtools': '/docs/session-replay/network-devtools',
  'session-sharing': '/docs/session-replay/session-sharing',
  'live-mode': '/docs/session-replay/live-mode',
  'console-messages': '/docs/session-replay/console-messages',
  'session-shortcut': '/docs/session-replay/session-shortcut',
  'html-iframe-recording': '/docs/session-replay/html-iframe-recording',
  sourcemaps: '/docs/error-monitoring/sourcemaps',
  'versioning-errors': '/docs/error-monitoring/versioning-errors',
  'grouping-errors': '/docs/error-monitoring/grouping-errors',
  canvas: '/docs/product-features/canvas',
  environments: '/docs/product-features/environments',
  'team-management': '/docs/product-features/team-management',
  'keyboard-shortcuts': '/docs/product-features/keyboard-shortcuts',
  analytics: '/docs/product-features/analytics',
  segments: '/docs/product-features/segments',
  'user-feedback': '/docs/product-features/user-feedback',
  'web-vitals': '/docs/product-features/web-vitals',
  comments: '/docs/product-features/comments',
  alerts: '/docs/product-features/alerts',
  webgl: '/docs/product-features/webgl',
  'performance-data': '/docs/product-features/performance-data',
  'session-search': '/docs/product-features/session-search',
  'frontend-observability': '/docs/product-features/frontend-observability',
  'deployment-overview': '/docs/on-premises/deployment-overview',
  'aws-deployment': '/docs/on-premises/deployment-overview/aws-deployment',
  'ec2-instance-setup':
    '/docs/on-premises/deployment-overview/aws-deployment/ec2-instance-setup',
  'custom-domain-mapping':
    '/docs/on-premises/deployment-overview/aws-deployment/custom-domain-mapping',
  'external-dependency-setup':
    '/docs/on-premises/deployment-overview/aws-deployment/external-dependency-setup',
  'configuration-and-ssl':
    '/docs/on-premises/deployment-overview/aws-deployment/configuration-and-ssl',
  'heroku-deployment':
    '/docs/on-premises/deployment-overview/heroku-deployment',
  'external-dependency-setup-cloned':
    '/docs/on-premises/deployment-overview/heroku-deployment/external-dependency-setup',
  'frequently-asked-questions': '/docs/on-premises/frequently-asked-questions',
  'intercom-integration': '/docs/integrations/intercom-integration',
  'sentry-integration': '/docs/integrations/sentry-integration',
  'slack-integration': '/docs/integrations/slack-integration',
  'reactjs-integration': '/docs/integrations/reactjs-integration',
  'amplitude-integration': '/docs/integrations/amplitude-integration',
  'mixpanel-integration': '/docs/integrations/mixpanel-integration',
  'segment-integration': '/docs/integrations/segment-integration',
  'linear-integration': '/docs/integrations/linear-integration',
  'front-plugin': '/docs/integrations/front-plugin',
  'electron-integration': '/docs/integrations/electron-integration',
  'clearbit-integration': '/docs/integrations/clearbit-integration',
  'vercel-integration': '/docs/integrations/vercel-integration',
  'api/networkrecordingoptions': '/docs/api/client/h-init',
  'api/hidentify': '/docs/api/client/h-identify',
  'api/htrack': '/docs/api/client/h-track',
  'api/ljQK-hconsumeerror': '/docs/api/client/h-consume-error',
  'api/hmetrics': '/docs/api/client/h-metrics',
  'api/metrics': '/docs/api/client/h-metrics',
  'api/hgetsessiondetails': '/docs/api/client/h-get-session-details',
  'api/hgetsessionurl': '/docs/api/client/h-get-session-url',
  'api/hstart': '/docs/api/client/h-start',
  'api/hstop': '/docs/api/client/h-stop',
  'api/haddsessionfeedback': '/docs/api/client/h-add-session-feedback',
  'api/htogglesessionfeedbackmodal':
    '/docs/api/client/h-toggle-session-feedback-modal',
  'api/highlight': '/docs/api/nextjs/highlight',
  'api/withhighlightconfig': '/docs/api/nextjs/with-highlight-config',
  'api/hinit': '/docs/api/nodejs/h-init',
  'api/hisinitialized': '/docs/api/nodejs/h-is-initialized',
  'api/hconsumeerror': '/docs/api/nodejs/h-consume-error',
  'api/hrecordmetric': '/docs/api/nodejs/h-record-metric',
  'api/hparseheaders': '/docs/api/nodejs/h-parse-headers',
  'api/changelog': '/changelogs',
};

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hostname = req.headers.get('host');
  for (const [k, v] of Object.entries(SUBDOMAIN_LANDING_PAGES)) {
    if (hostname?.startsWith(`${k}.`)) {
      if (pathname === '/') {
        let url = req.nextUrl.origin || 'https://highlight.io/';
        url = url.replace(/\/+$/, '');
        return NextResponse.rewrite(`${url}${v}`);
      }
    }
  }
  if (pathname.startsWith('/docs/')) {
    for (const [k, v] of Object.entries(DOCS_REDIRECTS)) {
      if (pathname === `/docs/${k}`) {
        let url = req.nextUrl.origin || 'https://highlight.io/';
        url = url.replace(/\/+$/, '');
        return NextResponse.redirect(`${url}${v}`, { status: 301 });
      }
    }
  }
}
