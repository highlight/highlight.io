import { NextRequest, NextResponse } from 'next/server'

// this will redirect the domain landing page to the following page component
const SUBDOMAIN_LANDING_PAGES = {
  docs: '/docs',
  observability: '/blog/frontend-observability',
  monitor: '/blog/frontend-observability',
  nextjs: '/blog/feature-nextjs-integration',
  nodejs: '/blog/feature-nodejs-integration',
  errors: '/blog/new-error-management-ui',
}

const old_links = [
  'docs/company',
  'docs/company/open-source/contributing',
  'docs/company/open-source',
  'docs/company/open-source/self-host-enterprise',
  'docs/company/open-source/self-host-hobby',
  'docs/company/values',
  'docs/getting-started/overview',
  'docs/getting-started/frontend-backend-mapping',
  'docs/getting-started/backend-sdk/overview',
  'docs/getting-started/backend-sdk/express',
  'docs/getting-started/backend-sdk/firebase',
  'docs/getting-started/backend-sdk/go',
  'docs/getting-started/backend-sdk',
  'docs/getting-started/backend-sdk/nextjs',
  'docs/getting-started/backend-sdk/nodejs',
  'docs/getting-started/backend-sdk/python',
  'docs/getting-started/backend-sdk/trpc',
  'docs/getting-started/client-sdk/overview',
  'docs/getting-started/client-sdk/angular',
  'docs/getting-started/client-sdk/gatsbyjs',
  'docs/getting-started/client-sdk/html',
  'docs/getting-started/client-sdk',
  'docs/getting-started/client-sdk/nextjs',
  'docs/getting-started/client-sdk/other',
  'docs/getting-started/client-sdk/reactjs',
  'docs/getting-started/client-sdk/shopify',
  'docs/getting-started/client-sdk/squarespace',
  'docs/getting-started/client-sdk/sveltekit',
  'docs/getting-started/client-sdk/vuejs',
  'docs/getting-started/client-sdk/webflow',
  'docs/getting-started/client-sdk/wordpress',
  'docs/getting-started/fullstack-frameworks',
  'docs/getting-started/fullstack-frameworks/next-js/overview',
  'docs/getting-started/fullstack-frameworks/next-js/env-variables',
  'docs/getting-started/fullstack-frameworks/next-js',
  'docs/getting-started/fullstack-frameworks/next-js/metrics-overview',
  'docs/getting-started',
  'docs/session-replay/console-messages',
  'docs/session-replay/html-iframe-recording',
  'docs/session-replay/identifying-sessions',
  'docs/session-replay',
  'docs/session-replay/live-mode',
  'docs/session-replay/network-devtools',
  'docs/session-replay/privacy',
  'docs/session-replay/rage-clicks',
  'docs/session-replay/recording-network-requests-and-responses',
  'docs/session-replay/session-sharing',
  'docs/session-replay/session-shortcut',
  'docs/session-replay/tracking-events',
  'docs/session-replay/versioning-sessions',
  'docs/error-monitoring/error-sharing',
  'docs/error-monitoring/grouping-errors',
  'docs/error-monitoring',
  'docs/error-monitoring/sourcemaps',
  'docs/error-monitoring/versioning-errors',
  'docs/product-features/alerts',
  'docs/product-features/analytics',
  'docs/product-features/canvas',
  'docs/product-features/comments',
  'docs/product-features/cross-origin-iframes',
  'docs/product-features/digests',
  'docs/product-features/environments',
  'docs/product-features/frontend-observability',
  'docs/product-features',
  'docs/product-features/keyboard-shortcuts',
  'docs/product-features/performance-data',
  'docs/product-features/segments',
  'docs/product-features/session-search',
  'docs/product-features/team-management',
  'docs/product-features/user-feedback',
  'docs/product-features/web-vitals',
  'docs/product-features/webgl',
  'docs/integrations/amplitude-integration',
  'docs/integrations/clearbit-integration',
  'docs/integrations/clickup-integration',
  'docs/integrations/discord-integration',
  'docs/integrations/electron-integration',
  'docs/integrations/front-plugin',
  'docs/integrations/height-integration',
  'docs/integrations',
  'docs/integrations/intercom-integration',
  'docs/integrations/linear-integration',
  'docs/integrations/mixpanel-integration',
  'docs/integrations/reactjs-integration',
  'docs/integrations/segment-integration',
  'docs/integrations/sentry-integration',
  'docs/integrations/slack-integration',
  'docs/integrations/vercel-integration',
  'docs/changelog/5.0.0',
  'docs/changelog/5.0.1',
  'docs/changelog/5.1.0',
  'docs/changelog/5.1.1',
  'docs/changelog/5.1.2',
  'docs/changelog/5.1.3',
  'docs/changelog/5.1.4',
  'docs/changelog/5.1.5',
  'docs/changelog/5.1.6',
  'docs/changelog/5.1.7',
  'docs/changelog/5.1.8',
  'docs/changelog/5.2.0',
  'docs/changelog/5.2.1',
  'docs/changelog/5.2.2',
  'docs/changelog/5.2.3',
  'docs/changelog',
  'docs/tips/content-security-policy',
  'docs/tips',
  'docs/tips/local-development',
  'docs/tips/monkey-patches',
  'docs/tips/performance-impact',
  'docs/tips/proxying-highlight',
  'docs/tips/sessions-search-deep-linking',
  'docs/tips/troubleshooting',
  'docs/tips/upgrading-highlight',
]

export const DOCS_REDIRECTS = {
  'amplitude-integration': '/docs/integrations/amplitude-integration',
  'api/changelog': '/changelogs',
  'api/haddsessionfeedback': '/docs/sdk/client#Hadd-session-feedback',
  'api/hconsumeerror': '/docs/sdk/nodejs#Hconsume-error',
  'api/hgetsessiondetails': '/docs/sdk/client#Hget-session-details',
  'api/hgetsessionurl': '/docs/sdk/client#Hget-session-url',
  'api/hidentify': '/docs/sdk/client#Hidentify',
  'api/highlight': '/docs/sdk/nextjs#Highlight',
  'api/hinit': '/docs/sdk/nodejs#Hinit',
  'api/hisinitialized': '/docs/sdk/nodejs#His-initialized',
  'api/hmetrics': '/docs/sdk/client#Hmetrics',
  'api/hparseheaders': '/docs/sdk/nodejs#Hparse-headers',
  'api/hrecordmetric': '/docs/sdk/nodejs#Hrecord-metric',
  'api/hstart': '/docs/sdk/client#Hstart',
  'api/hstop': '/docs/sdk/client#Hstop',
  'api/htogglesessionfeedbackmodal':
    '/docs/sdk/client#Htoggle-session-feedback-modal',
  'api/htrack': '/docs/sdk/client#Htrack',
  'api/ljQK-hconsumeerror': '/docs/sdk/client#Hconsume-error',
  'api/metrics': '/docs/sdk/client#Hmetrics',
  'api/networkrecordingoptions': '/docs/sdk/client#Hinit',
  'api/nodejs/h-init': '/docs/sdk/nodejs#Hinit',
  'api/withhighlightconfig': '/docs/sdk/nextjs#withHighlightConfig',
  'backend-sdk': '/docs/getting-started/backend-sdk',
  'clearbit-integration': '/docs/integrations/clearbit-integration',
  'client-sdk': '/docs/getting-started/client-sdk',
  'console-messages': '/docs/session-replay/console-messages',
  'content-security-policy': '/docs/tips/content-security-policy',
  'docs/general/product-features/canvas':
    '/docs/general/product-features/session-replay/canvas',
  'docs/general/product-features/console-messages':
    '/docs/general/product-features/session-replay/console-messages',
  'docs/general/product-features/cross-origin-iframes':
    '/docs/general/product-features/session-replay/cross-origin-iframes',
  'docs/general/product-features/html-iframe-recording':
    '/docs/general/product-features/session-replay/html-iframe-recording',
  'docs/general/product-features/live-mode':
    '/docs/general/product-features/session-replay/live-mode',
  'docs/general/product-features/session-search':
    '/docs/general/product-features/session-replay/session-search',
  'docs/general/product-features/versioning-sessions':
    '/docs/general/product-features/session-replay/versioning-sessions',
  'docs/general/product-features/web-vitals':
    '/docs/general/tips/performance-impact',
  'docs/general/session-replay/privacy':
    '/docs/general/product-features/session-replay/privacy',
  'docs/general/session-replay/tracking-events':
    '/docs/general/product-features/session-replay/tracking-events',
  'docs/general/error-monitoring/sourcemaps':
    '/docs/general/product-features/error-monitoring/sourcemaps',
  'docs/general/session-replay/rage-clicks':
    '/docs/general/product-features/session-replay/rage-clicks',
  'docs/general/product-features/frontend-observability':
    '/docs/general/product-features/session-replay/overview',
  'docs/general/integrations/reactjs-integration':
    '/docs/general/getting-started/client-sdk/react-js/overview',
  'docs/general/getting-started/client-sdk/reactjs':
    '/docs/general/getting-started/client-sdk/react-js/overview',
  'docs/general/integrations/sentry-integration':
    '/docs/general/product-features/error-monitoring/overview',
  'docs/session-replay/identifying-sessions':
    '/docs/general/product-features/session-replay/identifying-sessions',
  'docs/general/product-features/user-feedback':
    '/docs/general/product-features/session-replay/overview',
  'docs/general/session-replay/recording-network-requests-and-responses':
    '/docs/general/product-features/session-replay/recording-network-requests-and-responses',
  'electron-integration': '/docs/integrations/electron-integration',
  'express-backend': '/docs/getting-started/backend-sdk/nextjs',
  'front-plugin': '/docs/integrations/front-plugin',
  'frontend-observability': '/docs/product-features/frontend-observability',
  'go-backend': '/docs/getting-started/backend-sdk/go',
  'grouping-errors': '/docs/error-monitoring/grouping-errors',
  'html-iframe-recording': '/docs/session-replay/html-iframe-recording',
  'identifying-users': '/docs/session-replay/identifying-sessions',
  'intercom-integration': '/docs/integrations/intercom-integration',
  'keyboard-shortcuts': '/docs/product-features/keyboard-shortcuts',
  'linear-integration': '/docs/integrations/linear-integration',
  'live-mode': '/docs/session-replay/live-mode',
  'local-development': '/docs/tips/local-development',
  'mixpanel-integration': '/docs/integrations/mixpanel-integration',
  'monkey-patches': '/docs/tips/monkey-patches',
  'network-devtools': '/docs/session-replay/network-devtools',
  'nextjs-backend': '/docs/getting-started/backend-sdk/express',
  'nextjs-sdk': '/docs/getting-started/backend-sdk/nextjs',
  'nodejs-backend': '/docs/getting-started/backend-sdk/nodejs',
  'performance-data': '/docs/product-features/performance-data',
  'performance-impact': '/docs/tips/performance-impact',
  'proxying-highlight': '/docs/tips/proxying-highlight',
  'rage-clicks': '/docs/session-replay/rage-clicks',
  'reactjs-integration': '/docs/integrations/reactjs-integration',
  'recording-network-requests-and-responses':
    '/docs/session-replay/recording-network-requests-and-responses',
  'segment-integration': '/docs/integrations/segment-integration',
  'sentry-integration': '/docs/integrations/sentry-integration',
  'session-search': '/docs/product-features/session-search',
  'session-search-deep-linking': '/docs/tips/sessions-search-deep-linking',
  'session-sharing': '/docs/session-replay/session-sharing',
  'session-shortcut': '/docs/session-replay/session-shortcut',
  'slack-integration': '/docs/integrations/slack-integration',
  'team-management': '/docs/product-features/team-management',
  'tracking-events': '/docs/session-replay/tracking-events',
  'upgrading-highlight': '/docs/tips/upgrading-highlight',
  'user-feedback': '/docs/product-features/user-feedback',
  'vercel-integration': '/docs/integrations/vercel-integration',
  'versioning-errors': '/docs/error-monitoring/versioning-errors',
  'versioning-sessions': '/docs/session-replay/versioning-sessions',
  'web-vitals': '/docs/product-features/web-vitals',
  alerts: '/docs/product-features/alerts',
  analytics: '/docs/product-features/analytics',
  angular: '/docs/getting-started/client-sdk/angular',
  api: '/docs/sdk/client#Hinit',
  canvas: '/docs/product-features/canvas',
  comments: '/docs/product-features/comments',
  environments: '/docs/product-features/environments',
  gatsbyjs: '/docs/getting-started/client-sdk/gatsbyjs',
  html: '/docs/getting-started/client-sdk/html',
  metrics:
    '/docs/getting-started/fullstack-frameworks/next-js/metrics-overview',
  nextjs: '/docs/getting-started/client-sdk/nextjs',
  other: '/docs/getting-started/client-sdk/other',
  privacy: '/docs/session-replay/privacy',
  reactjs: '/docs/getting-started/client-sdk/reactjs',
  segments: '/docs/product-features/segments',
  shopify: '/docs/getting-started/client-sdk/shopify',
  sourcemaps: '/docs/error-monitoring/sourcemaps',
  squarespace: '/docs/getting-started/client-sdk/squarespace',
  sveltekit: '/docs/getting-started/client-sdk/sveltekit',
  troubleshooting: '/docs/tips/troubleshooting',
  vuejs: '/docs/getting-started/client-sdk/vuejs',
  webflow: '/docs/getting-started/client-sdk/webflow',
  webgl: '/docs/product-features/webgl',
  wordpress: '/docs/getting-started/client-sdk/wordpress',
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const hostname = req.headers.get('host')
  for (const [k, v] of Object.entries(SUBDOMAIN_LANDING_PAGES)) {
    if (hostname?.startsWith(`${k}.`)) {
      if (pathname === '/') {
        let url = req.nextUrl.origin || 'https://highlight.io/'
        url = url.replace(/\/+$/, '')
        return NextResponse.rewrite(`${url}${v}`)
      }
    }
  }
  if (pathname.startsWith('/docs/')) {
    for (const [k, v] of Object.entries(DOCS_REDIRECTS)) {
      if (pathname === `/docs/${k}`) {
        let url = req.nextUrl.origin || 'https://highlight.io/'
        url = url.replace(/\/+$/, '')
        return NextResponse.redirect(`${url}${v}`, { status: 301 })
      }
    }
  }
  for (var link of old_links) {
    if (pathname.endsWith(link)) {
      link = link.replace(' ', '')
      let split = link.split('/')
      let v = [split[0]].concat(['general'], split.slice(1)).join('/')
      let url = req.nextUrl.origin || 'https://highlight.io/'
      url = url.replace(/\/+$/, '')
      return NextResponse.redirect(`${url}/${v}`, { status: 302 })
    }
  }
}
