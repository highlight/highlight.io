import classNames from 'classnames'
import { NextPage } from 'next'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PrimaryButton } from '../../components/common/Buttons/PrimaryButton'
import { FooterCallToAction } from '../../components/common/CallToAction/FooterCallToAction'
import { OSSCallToAction } from '../../components/common/CallToAction/OSSCallToAction'
import Footer from '../../components/common/Footer/Footer'
import Navbar from '../../components/common/Navbar/Navbar'
import { Section } from '../../components/common/Section/Section'
import { Typography } from '../../components/common/Typography/Typography'
import { CompaniesReel } from '../../components/Home/CompaniesReel/CompaniesReel'
import { CustomerReviewTrack } from '../../components/Home/CustomerReviewTrack'
import homeStyles from '../../components/Home/Home.module.scss'
import productStyles from '../../components/Products/Products.module.scss'
import InfoRow from '../../components/Products/InfoRow'
import { MdKeyboardReturn } from 'react-icons/md'
import sessionscreenshot from '../../public/images/sessionscreenshot.png'
import sessionReplayHero from '../../public/images/features/sessionReplayHero.png'
import sessionReplay1 from '../../public/images/features/sessionReplay1.png'
import sessionReplay2 from '../../public/images/features/sessionReplay2.png'
import sessionReplay3 from '../../public/images/landingInfoRow1.png'
import sessionReplay4 from '../../public/images/landingInfoRow2.png'

const ShowcasePage: NextPage = () => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div>
      <Navbar />
      <div className="hidden md:flex ml-10 my-2">
        <Link href="/">
          <Typography type="copy3" emphasis={true}>
            <div className="flex items-center justify-start gap-2">
              <MdKeyboardReturn className="h-5" /> Explore highlight.io
            </div>
          </Typography>
        </Link>
      </div>
      <main>
        <div className="flex flex-col xl:flex-row justify-between w-screen overflow-hidden px-8 mx-auto lg:px-4 lg:py-28 max-w-[1200px]">
          <div className="lg:w-1/2 flex justify-center mt-10">
            <div className="flex flex-col max-w-4xl gap-8 text-center lg:text-left">
              <h2 className="text-white">Session Replay & UX Monitoring</h2>
              <Typography type="copy1" className="text-copy-on-dark">
                Pixel-perfect video replay of your web application. Step into the shoes of your users.
              </Typography>
              <div className="flex flex-col lg:flex-row justify-start gap-4 w-full lg:w-auto">
                <PrimaryButton
                  className={classNames(homeStyles.solidButton, 'min-w-[180px]')}
                  href="https://app.highlight.io/?sign_up=1"
                >
                  <Typography type="copy2" emphasis={true}>
                    Get started
                  </Typography>
                </PrimaryButton>
                {/* <PrimaryButton href={'/docs'} className={classNames(homeStyles.hollowButton)}>
                  <Typography type="copy2" emphasis={true}>
                    Read our docs
                  </Typography>
                </PrimaryButton> */}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-12 lg:mt-0 lg:absolute right-0 overflow-y-hidden">
            <Image
              className={`hidden lg:flex right-0 object-contain bottom-0 lg:w-[450px] xl:w-[600px]`}
              src={sessionReplayHero}
              alt="Feature Spotlight"
              onLoadingComplete={() => setImageLoaded(true)}
            />
            <Image
              className={`lg:hidden right-0 object-contain bottom-0  md:w-[500px]`}
              src={sessionscreenshot}
              alt="Feature Spotlight"
              onLoadingComplete={() => setImageLoaded(true)}
            />
          </div>
        </div>
        <div className="w-full mx-auto max-w-screen-2xl mt-24">
          <Section className="flex flex-col gap-20">
            <div className="mx-auto max-w-[1000px]">
              <h2 className="self-center text-center">
                Step into the shoes of <span className="text-highlight-yellow">your users.</span>
              </h2>
              <div className="px-8 max-w-[750px] mx-auto mt-6 text-center">
                <Typography type="copyHeader" className="text-copy-on-dark text-center">
                  Reproduce hard-to-crack issues, understand how your product is used.
                </Typography>
              </div>
            </div>

            <div className={productStyles.infoContainer}>
              <InfoRow
                title={'Powerful privacy controls.'}
                desc={
                  'Privacy matters. Use the highlight.io SDK to obfuscate and redact data to control when and where to record.'
                }
                link={'/docs/getting-started/client-sdk/replay-configuration/privacy'}
                linkText={'Read the docs'}
                privacy
                imgSrc={sessionReplay2}
                invert
              />

              <div className={productStyles.divider} />

              <InfoRow
                title={'Reproduce the dev-tools for every user session.'}
                desc={
                  'Console logs, errors, network requests, and more. Get full context around the issues on your web application.'
                }
                link={'/docs/getting-started/client-sdk/replay-configuration/overview'}
                linkText={'Read the docs'}
                imgSrc={sessionReplay2}
              />

              <div className={productStyles.divider} />

              <InfoRow
                title={'From a button click to a server-side error.'}
                desc={
                  'Visualize a complete, cohesive view of your entire stack. All the way from a user clicking a button to a server-side log.'
                }
                link={'https://app.highlight.io/?sign_up=1'}
                linkText={'Get started for free'}
                imgSrc={sessionReplay3}
              />

              <div className={productStyles.divider} />

              <InfoRow
                title={'Support for all the modern frameworks.'}
                desc={
                  'Whether its react, angular, or even a framework you built yourself. As long as it run javascript, we got you covered.'
                }
                link={'https://app.highlight.io/?sign_up=1'}
                linkText={'Get started for free'}
                imgSrc={sessionReplay4}
                invert
              />
            </div>
          </Section>
        </div>
        <OSSCallToAction />
        <Section>
          <CompaniesReel />
        </Section>
        <Section>
          <div className={homeStyles.anchorFeature}>
            <div className={homeStyles.anchorHead}>
              <Typography type="copy2" onDark>
                Don&apos;t take our word. <Link href="/customers">Read our customer review section →</Link>
              </Typography>
            </div>
          </div>
        </Section>
        <CustomerReviewTrack />
        <FooterCallToAction />
      </main>
      <Footer />
    </div>
  )
}

export default ShowcasePage
