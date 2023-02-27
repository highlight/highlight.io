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
import { BigHeroArt } from '../../components/Home/BigHeroArt'
import { CompaniesReel } from '../../components/Home/CompaniesReel/CompaniesReel'
import { CustomerReviewTrack } from '../../components/Home/CustomerReviewTrack'
import homeStyles from '../../components/Home/Home.module.scss'
import productStyles from '../../components/Products/Products.module.scss'
import InfoRow from '../../components/Products/InfoRow'
import ProductsReplay from '../../public/images/products-replay.png'
import { MdKeyboardReturn } from 'react-icons/md'
import sessionReplay from '../../public/images/session-replay.png'
import sessionReplay1 from '../../public/images/features/sessionReplay1.png'
import sessionReplay2 from '../../public/images/features/sessionReplay2.png'
import sessionReplay3 from '../../public/images/landingInfoRow1.png'
import { ObfuscationSlider } from '../../components/Home/ObfuscationSlider/ObfuscationSlider'

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
        <div className="flex justify-center">
          <div className="flex flex-col md:flex-row justify-between w-screen overflow-hidden md:py-28 max-w-[1200px]">
            <div className="w-1/2 flex justify-center mt-10">
              <div className="flex flex-col max-w-4xl gap-8 text-center md:text-left">
                <h1 className="text-white">Session Replay & UX Monitoring</h1>
                <Typography type="copy1" className="text-copy-on-dark">
                  A cohesive toolset for monitoring and maintaining your full-stack web application.
                </Typography>
                <div className="flex flex-col md:flex-row justify-start gap-4 w-full md:w-auto">
                  <PrimaryButton
                    className={classNames(homeStyles.solidButton, 'min-w-[180px]')}
                    href="https://app.highlight.io/?sign_up=1"
                  >
                    <Typography type="copy2" emphasis={true}>
                      Get started
                    </Typography>
                  </PrimaryButton>
                  <PrimaryButton href={'/docs'} className={classNames(homeStyles.hollowButton)}>
                    <Typography type="copy2" emphasis={true}>
                      Read our docs
                    </Typography>
                  </PrimaryButton>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-12 md:mt-0 md:absolute right-0 overflow-y-hidden">
              <Image
                className={`right-0 object-contain bottom-0 sm:w-[280px] md:w-[300px] lg:w-[450px] xl:w-[450px]`}
                src={sessionReplay}
                alt="Feature Spotlight"
                onLoadingComplete={() => setImageLoaded(true)}
              />
            </div>
          </div>
        </div>
        <div className="w-full mx-auto max-w-screen-2xl mt-24">
          <Section className="flex flex-col gap-20">
            <h2 className="self-center max-w-[809px] text-center">
              Understand your users & why they’re falling through the cracks.
            </h2>

            <div className={productStyles.infoContainer}>
              <InfoRow
                title={'Search for sessions in confidence.'}
                desc={'Search for user sessions by email, text content, and more. And create saved searches for later.'}
                link={'/docs/general/product-features/session-replay/session-search'}
                linkText={'Read the docs'}
                imgSrc={sessionReplay1}
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
                title={'Powerful privacy controls.'}
                desc={'Privacy matters. Use our SDK to obfuscate and redact data to control when and where to record.'}
                link={'/docs/getting-started/client-sdk/replay-configuration/privacy'}
                linkText={'Read the docs'}
                privacy
                imgSrc={sessionReplay2}
                invert
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
            </div>
          </Section>
        </div>
        <div className="hidden md:flex mx-auto h-[2px] rounded-full bg-divider-on-dark opacity-50 max-w-[400px]"></div>
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
