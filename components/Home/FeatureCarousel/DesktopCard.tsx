import React from 'react'
import { Feature } from './FeatureCarousel'
import Image from 'next/image'
import { PrimaryButton } from '../../common/Buttons/PrimaryButton'
import { Typography } from '../../common/Typography/Typography'
import { HighlightCodeBlock } from '../../Docs/HighlightCodeBlock/HighlightCodeBlock'
import highlightCodeTheme from '../../common/CodeBlock/highlight-code-theme'
import { Code } from 'react-code-blocks'

export const DesktopCard = (props: { feature: Feature; index: number }) => {
  return (
    <div
      key={props.index}
      className="relative flex justify-end px-5 lg:px-16 w-full  lg:h-[450px] xl:h-[525px] md:border-[1px] border-divider-on-dark lg:rounded-br-lg lg:rounded-bl-lg flex-shrink-0 snap-always snap-center"
    >
      <div className="hidden sm:flex w-1/2">
        <div className="absolute bottom-0 left-0">
          <Image
            className="object-contain sm:w-[350px] md:w-[450px] lg:w-[500px] xl:w-[550px] sm:h-[325px] md:h-[375px] lg:h-[425px] xl:h-[520px]"
            src={props.feature.desktopImage}
            alt="Feature Spotlight"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 justify-start md:pt-8 xl:justify-center text-left w-full sm:w-2/5">
        <div className="flex flex-col md:gap-2">
          <h5 className="hidden sm:flex">{props.feature.title}</h5>
          <h4 className="sm:hidden">{props.feature.title}</h4>
          <Typography type="copy3">{props.feature.description}</Typography>
        </div>
        {props.feature.code ? (
          <Code
            language={'bash'}
            text={props.feature.code.join('\n')}
            showLineNumbers={false}
            theme={highlightCodeTheme}
            wrapLines
          />
        ) : (
          <div className="flex flex-col gap-5 py-4 my-3 bg-color-divider-on-dark rounded-lg px-4">
            <div className="flex items-center gap-2">
              {props.feature.featureImage1}
              <Typography
                type="copy3"
                className="text-color-copy-on-dark"
                emphasis
              >
                {props.feature.feature1}
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              {props.feature.featureImage2}
              <Typography
                type="copy3"
                className="text-color-copy-on-dark"
                emphasis
              >
                {props.feature.feature2}
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              {props.feature.featureImage3}
              <Typography
                type="copy3"
                className="text-color-copy-on-dark"
                emphasis
              >
                {props.feature.feature3}
              </Typography>
            </div>
          </div>
        )}
        <div className="flex justify-start mb-4">
          <PrimaryButton
            href={props.feature.link}
            className="py-[6px] text-center w-full sm:w-auto"
          >
            <Typography type="copy3" emphasis={true}>
              Learn More
            </Typography>
          </PrimaryButton>
        </div>
        <div className="flex sm:hidden justify-center w-full ">
          <Image
            className="object-cover"
            src={props.feature.mobileImage}
            alt="Feature Spotlight"
          />
        </div>
      </div>
    </div>
  )
}
