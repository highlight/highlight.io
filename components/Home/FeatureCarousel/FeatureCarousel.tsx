import styles from '../Home.module.scss';
import classNames from 'classnames';
import { Typography } from '../../../components/common/Typography/Typography';
import { ReactElement, useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { PrimaryButton } from '../../common/Buttons/PrimaryButton';
import featureImg1 from '../../../public/images/featureCarousel1.png';
import landingCarousel1 from '../../../public/images/landingCarousel1.png';
import useEmblaCarousel from 'embla-carousel-react'
import { HiTerminal, HiFilm } from 'react-icons/hi';
import { IconType } from 'react-icons';

export type Feature = {
  title: string
  description: string
  thumbnail: JSX.Element
  desktopImage: StaticImageData
  mobileImage: StaticImageData
  feature1: string
  feature2: string
  feature3: string
  link: string
}

const features: Feature[] = [
  {
    title: "Session Replay",
    description: "Error Monitoring for frontend & backend.",
    thumbnail: <HiFilm className="h-[40px] w-[40px]" />,
    desktopImage: featureImg1,
    mobileImage: featureImg1,
    feature1: "Console and Network Recording",
    feature2: "Live Session Recording",
    feature3: "Powerful Privacy Controls",
    link: "/docs/general/product-features/session-replay/overview",
  },
  {
    title: "Session Replay",
    description: "Error Monitoring for frontend & backend.",
    thumbnail: <HiFilm className="h-[40px] w-[40px]" />,
    desktopImage: featureImg1,
    mobileImage: featureImg1,
    feature1: "Console and Network Recording",
    feature2: "Live Session Recording",
    feature3: "Powerful Privacy Controls",
    link: "/docs/general/product-features/session-replay/overview",
  },
  {
    title: "Session Replay",
    description: "Error Monitoring for frontend & backend.",
    thumbnail: <HiFilm className="h-[40px] w-[40px]" />,
    desktopImage: featureImg1,
    mobileImage: featureImg1,
    feature1: "Console and Network Recording",
    feature2: "Live Session Recording",
    feature3: "Powerful Privacy Controls",
    link: "/docs/general/product-features/session-replay/overview",
  },
  {
    title: "Session Replay",
    description: "Error Monitoring for frontend & backend.",
    thumbnail: <HiFilm className="h-[40px] w-[40px]" />,
    desktopImage: featureImg1,
    mobileImage: featureImg1,
    feature1: "Console and Network Recording",
    feature2: "Live Session Recording",
    feature3: "Powerful Privacy Controls",
    link: "/docs/general/product-features/session-replay/overview",
  },
]

export const FeatureCarousel = () => {
  const [selected, setSelected] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })

  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(selected)
      emblaApi.on('select', () => {
        setSelected(emblaApi.selectedScrollSnap())
      })
    }
  }, [emblaApi, selected])


  return (
    <div className="flex flex-col overflow-x-hidden lg:rounded-lg max-w-[100vw] xl:max-w-[1100px]">
      <div className={`grid grid-cols-${features.length}`}>
        {features.map((feature, index) =>
          <div key={index} onClick={() => setSelected(index)} className={classNames(styles.carouselButton, "group xlg:rounded-tl-lg")}>
            <div className={`${selected == index ? "bg-divider-on-dark" : "group-hover:bg-divider-on-dark group-hover:bg-opacity-75"} h-full flex justify-center gap-1 px-3 py-2 rounded-lg transition-all`}>
              <div className="flex flex-col">
                <div className="flex justify-center text-color-copy-on-dark">
                  {feature.thumbnail}
                </div>
                <Typography type="copy3" className="text-center" emphasis={true}>Session Replay</Typography>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="w-screen lg:w-full" ref={emblaRef}>
        <div className={classNames(styles.carouselContainer, "lg:gap-4")}>
          {features.map((feature, index) =>
            <div key={index} className="relative flex justify-end px-4 lg:px-16 w-full h-[450px] xl:h-[525px] border-[1px] border-divider-on-dark lg:rounded-br-lg lg:rounded-bl-lg flex-shrink-0 snap-always snap-center">
              <div className="w-1/2">
                <div className="absolute bottom-0 left-0">
                  <Image className="object-contain md:w-[450px] xl:w-[550px]" src={landingCarousel1} alt="Feature Spotlight" />
                </div>
              </div>
              <div className="flex flex-col gap-4 justify-start pt-8 xl:justify-center text-left w-2/5">
                <h5>{feature.title}</h5>
                <Typography type="copy3">{feature.description}</Typography>
                <div className="flex flex-col gap-5 py-4 my-3 bg-color-divider-on-dark rounded-lg px-4">
                  <div className="flex items-center gap-2">
                    <HiTerminal className="w-[20px] h-[20px]" />
                    <Typography type="copy3" className="text-color-copy-on-dark" emphasis>{feature.feature1}</Typography>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiTerminal className="w-[20px] h-[20px]" />
                    <Typography type="copy3" className="text-color-copy-on-dark" emphasis>{feature.feature2}</Typography>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiTerminal className="w-[20px] h-[20px]" />
                    <Typography type="copy3" className="text-color-copy-on-dark" emphasis>{feature.feature3}</Typography>
                  </div>
                </div>
                <div className="flex justify-start">
                  <PrimaryButton href={feature.link} className='py-[6px] px-12'>
                    <Typography type="copy3" emphasis={true}>Learn More</Typography>
                  </PrimaryButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div >
  )
};
