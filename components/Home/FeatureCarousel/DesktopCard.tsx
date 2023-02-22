import React from 'react'
import { Feature } from './FeatureCarousel'
import Image from 'next/image'
import { Typography } from '../../common/Typography/Typography'
import highlightCodeTheme from '../../common/CodeBlock/highlight-code-theme'
import { Code } from 'react-code-blocks'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/20/solid'

const DesktopImage = ({ feature }: { feature: Feature }) => {
  return (
    <div className="hidden sm:flex w-1/2">
      <div
        className={`absolute bottom-0 ${feature.right ? 'right-0' : 'left-0'}`}
      >
        <Image
          className="object-contain sm:w-[280px] md:w-[300px] lg:w-[450px] xl:w-[450px] "
          src={feature.desktopImage}
          alt="Feature Spotlight"
        />
      </div>
    </div>
  )
}

const DesktopFeatures = ({ feature }: { feature: Feature }) => {
  return (
    <div className="flex flex-col justify-between h-full sm:w-1/2 md:w-2/3 px-5">
      <div className="flex flex-col gap-4 justify-start md:pt-8 text-left">
        <div className="flex flex-col gap-2">
          <h5 className="hidden sm:flex">{feature.title}</h5>
          <h4 className="sm:hidden">{feature.title}</h4>
          <Typography type="copy3" className="text-copy-on-dark md:text-[18px]">{feature.description}</Typography>
        </div>
        {feature.code ? (
          <Code
            language={'bash'}
            text={feature.code.join('\n')}
            showLineNumbers={false}
            theme={highlightCodeTheme}
            wrapLines
          />
        ) : (
          <div className="flex flex-col gap-3 mt-3 rounded-lg">
            <div className="flex items-center gap-2 border-[1px] border-divider-on-dark py-3 px-5 rounded-lg text-color-copy-on-dark">
              {feature.featureImage1}
              <Typography
                type="copy3"
                emphasis
              >
                {feature.feature1}
              </Typography>
            </div>
            <div className="flex items-center gap-2 border-[1px] border-divider-on-dark py-3 px-5 rounded-lg text-color-copy-on-dark">
              {feature.featureImage2}
              <Typography
                type="copy3"
                emphasis
              >
                {feature.feature2}
              </Typography>
            </div>
            <div className="flex items-center gap-2 border-[1px] border-divider-on-dark py-3 px-5 rounded-lg text-color-copy-on-dark">
              {feature.featureImage3}
              <Typography
                type="copy3"
                emphasis
              >
                {feature.feature3}
              </Typography>
            </div>
          </div>
        )}
        <div className="flex justify-center sm:justify-start mb-4">
          <Link href={`${feature.link}`} target="_blank">
            <Typography type="copy3" emphasis={true}>
              <div className="flex align-center justify-center gap-2">
                Learn More <ArrowRightIcon height={28} width={28} />
              </div>
            </Typography>
          </Link>
        </div>
      </div>
      <div className="flex sm:hidden justify-center w-full">
        <Image
          className="object-contain max-h-[200px]"
          src={feature.mobileImage}
          alt="Feature Spotlight"
        />
      </div>
    </div >
  )
}

export const DesktopCard = (props: { feature: Feature; index: number }) => {
  return (
    <div
      key={props.index}
      className="relative flex w-full md:h-[475px] lg:h-[525px] border-x-0 sm:border-y-[1px] md:border-x-[1px]  border-divider-on-dark flex-shrink-0 snap-always snap-center xl:rounded-br-lg xl:rounded-bl-lg overflow-y-hidden"
    >
      <div className="mx-5 py-8 border-[1px] sm:border-none border-divider-on-dark rounded-lg">
        {props.feature.right ? (
          <>
            <DesktopFeatures feature={props.feature} />
            <DesktopImage feature={props.feature} />
          </>
        ) : (
          <>
            <DesktopImage feature={props.feature} />
            <DesktopFeatures feature={props.feature} />
          </>
        )}
      </div>
    </div>
  )
}
