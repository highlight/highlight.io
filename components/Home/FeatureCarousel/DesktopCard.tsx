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
          className="object-contain sm:w-[330px] md:w-[350px] lg:w-[395px] xl:w-[450px] "
          src={feature.desktopImage}
          alt="Feature Spotlight"
        />
      </div>
    </div>
  )
}

const DesktopFeatures = ({ feature }: { feature: Feature }) => {
  return (
    <div className="flex flex-col gap-4 justify-start md:pt-8 xl:pt-16 text-left w-full sm:w-1/2 px-5 lg:px-16">
      <div className="flex flex-col md:gap-2">
        <h5 className="hidden sm:flex">{feature.title}</h5>
        <h4 className="sm:hidden">{feature.title}</h4>
        <Typography type="copy3">{feature.description}</Typography>
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
        <div className="flex flex-col gap-5 py-4 my-3 bg-color-divider-on-dark rounded-lg px-4">
          <div className="flex items-center gap-2">
            {feature.featureImage1}
            <Typography
              type="copy3"
              className="text-color-copy-on-dark"
              emphasis
            >
              {feature.feature1}
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            {feature.featureImage2}
            <Typography
              type="copy3"
              className="text-color-copy-on-dark"
              emphasis
            >
              {feature.feature2}
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            {feature.featureImage3}
            <Typography
              type="copy3"
              className="text-color-copy-on-dark"
              emphasis
            >
              {feature.feature3}
            </Typography>
          </div>
        </div>
      )}
      <div className="flex justify-center mb-4">
        <Link href={`${feature.link}`} target="_blank">
          <Typography type="copy3" emphasis={true}>
            <div className="flex align-center justify-center gap-2">
              Learn More <ArrowRightIcon height={28} width={28} />
            </div>
          </Typography>
        </Link>
      </div>
      <div className="flex sm:hidden justify-center w-full ">
        <Image
          className="object-cover"
          src={feature.mobileImage}
          alt="Feature Spotlight"
        />
      </div>
    </div>
  )
}

export const DesktopCard = (props: { feature: Feature; index: number }) => {
  return (
    <div
      key={props.index}
      className="relative flex w-full lg:h-[450px] xl:h-[525px] md:border-[1px] border-divider-on-dark xl:rounded-br-lg xl:rounded-bl-lg flex-shrink-0 snap-always snap-center"
    >
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
  )
}
