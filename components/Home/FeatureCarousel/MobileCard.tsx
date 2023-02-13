import React from "react";
import { Feature } from "./FeatureCarousel";
import Image from "next/image";
import { PrimaryButton } from "../../common/Buttons/PrimaryButton";
import { Typography } from "../../common/Typography/Typography";

export const DesktopCard = (props: { feature: Feature, index: number }) => {
  return (
    <div key={props.index} className="relative flex justify-end px-4 lg:px-16 w-full h-[450px] xl:h-[525px] border-[1px] border-divider-on-dark lg:rounded-br-lg lg:rounded-bl-lg flex-shrink-0 snap-always snap-center">
      <div className="w-1/2">
        <div className="absolute bottom-0 left-0">
          <Image className="object-contain md:w-[450px] xl:w-[550px]" src={props.feature.desktopImage} alt="Feature Spotlight" />
        </div>
      </div>
      <div className="flex flex-col gap-4 justify-start pt-8 xl:justify-center text-left w-2/5">
        <h5>{props.feature.title}</h5>
        <Typography type="copy3">{props.feature.description}</Typography>
        <div className="flex flex-col gap-5 py-4 my-3 bg-color-divider-on-dark rounded-lg px-4">
          <div className="flex items-center gap-2">
            {props.feature.featureImage1}
            <Typography type="copy3" className="text-color-copy-on-dark" emphasis>{props.feature.feature1}</Typography>
          </div>
          <div className="flex items-center gap-2">
            {props.feature.featureImage1}
            <Typography type="copy3" className="text-color-copy-on-dark" emphasis>{props.feature.feature2}</Typography>
          </div>
          <div className="flex items-center gap-2">
            {props.feature.featureImage1}
            <Typography type="copy3" className="text-color-copy-on-dark" emphasis>{props.feature.feature3}</Typography>
          </div>
        </div>
        <div className="flex justify-start">
          <PrimaryButton href={props.feature.link} className='py-[6px] px-12'>
            <Typography type="copy3" emphasis={true}>Learn More</Typography>
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}; 