import sessionscreenshot from '../../public/images/sessionscreenshot.png'
import sessionReplayHero from '../../public/images/features/sessionReplayHero.png'
import sessionReplay2 from '../../public/images/features/sessionReplay2.png'
import sessionReplay3 from '../../public/images/landingInfoRow1.png'
import sessionReplay4 from '../../public/images/landingInfoRow2.png'
import { StaticImageData } from 'next/image'

type InfoRow = {
  header: string
  subheader: string
  link: string
  linkText: string
  image?: StaticImageData //Shows the privacy slider if null
  invert: boolean //Image on right
  code?: string
  privacy?: boolean
}

export interface iFeature {
  slug: string
  header: string
  subheader: string
  docsLink: string
  slantedImage: StaticImageData
  regularImage: StaticImageData //For mobile and 2xl screens
  header2: string
  subheader2: string
  infoRows?: InfoRow[]
}

const reactSnippet: string = `import { NextResponse } from 'next/server'

export function middleware (request: NextRequest) {
  return NextResponse.next()
}
`

export const FEATURES: { [k: string]: iFeature } = {
  'session-replay': {
    slug: 'session-replay',
    header: 'Session Replay & UX Monitoring',
    subheader: 'Pixel-perfect video replay of your web application. Step into the shoes of your users.',
    docsLink: '/docs/general/product-features/session-replay/overview',
    slantedImage: sessionReplayHero,
    regularImage: sessionscreenshot,
    header2: "Debug from a user's perspective",
    subheader2: 'Reproduce hard-to-crack issues and understand how your product is used.',
    infoRows: [
      {
        header: 'Powerful privacy controls.',
        subheader:
          'Privacy matters. Use the highlight.io SDK to obfuscate and redact data to control when and where to record.',
        link: '/docs/getting-started/client-sdk/replay-configuration/privacy',
        linkText: 'Read the Docs',
        invert: true,
        privacy: true,
      },
      {
        header: 'Reproduce the dev-tools for every session.',
        subheader:
          'Console logs, errors, network requests, and more. Get full context around the issues on your web application.',
        link: '/docs/getting-started/client-sdk/replay-configuration/overview',
        linkText: 'Read the Docs',
        image: sessionReplay2,
        invert: false,
      },
      {
        header: 'From a button click to a server-side error.',
        subheader:
          'Visualize a complete, cohesive view of your entire stack. All the way from a user clicking a button to a server-side log.',
        link: 'https://app.highlight.io/?sign_up=1',
        linkText: 'Get started for free',
        image: sessionReplay3,
        invert: true,
      },
      {
        header: 'Support for all the modern frameworks.',
        subheader:
          'Whether its React, Angular, or even a framework you built yourself. As long as it runs Javascript, we got you covered.',
        link: '/docs/getting-started/overview',
        linkText: 'Read the docs',
        image: sessionReplay4,
        invert: false,
      },
      {
        header: 'A few lines of code. That’s it.',
        subheader: 'Turn on Session Replay in seconds and instantly get the visibility you need.',
        link: '/docs/getting-started/overview',
        linkText: 'Framework Docs',
        invert: true,
        code: reactSnippet,
      },
    ],
  },
}
