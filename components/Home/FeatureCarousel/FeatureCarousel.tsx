import styles from '../Home.module.scss';
import classNames from 'classnames';
import { Typography } from '../../../components/common/Typography/Typography';
import { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { PrimaryButton } from '../../common/Buttons/PrimaryButton';
import featureImg1 from '../../../public/images/featureCarousel1.png';
import landingCarousel1 from '../../../public/images/landingCarousel1.png';
import useEmblaCarousel from 'embla-carousel-react'
import { HiTerminal, HiFilm } from 'react-icons/hi';
import { DesktopCard } from './DesktopCard';

export type Feature = {
  title: string
  description: string
  thumbnail: JSX.Element
  desktopImage: StaticImageData
  mobileImage: StaticImageData
  feature1: string
  featureImage1: JSX.Element
  feature2: string
  featureImage2: JSX.Element
  feature3: string
  featureImage3: JSX.Element
  link: string
}

const features: Feature[] = [
  {
    title: "Session Replay",
    description: "Error Monitoring for frontend & backend.",
    thumbnail: <HiFilm className="h-[40px] w-[40px]" />,
    desktopImage: landingCarousel1,
    mobileImage: featureImg1,
    feature1: "Console and Network Recording",
    featureImage1: <HiTerminal className="h-[20px] w-[20px]" />,
    feature2: "Live Session Recording",
    featureImage2: <HiTerminal className="h-[20px] w-[20px]" />,
    feature3: "Powerful Privacy Controls",
    featureImage3: <HiTerminal className="h-[20px] w-[20px]" />,
    link: "/docs/general/product-features/session-replay/overview",
  },
  {
    title: "Session Replay",
    description: "Error Monitoring for frontend & backend.",
    thumbnail: <HiFilm className="h-[40px] w-[40px]" />,
    desktopImage: landingCarousel1,
    mobileImage: featureImg1,
    feature1: "Console and Network Recording",
    featureImage1: <HiTerminal className="h-[20px] w-[20px]" />,
    feature2: "Live Session Recording",
    featureImage2: <HiTerminal className="h-[20px] w-[20px]" />,
    feature3: "Powerful Privacy Controls",
    featureImage3: <HiTerminal className="h-[20px] w-[20px]" />,
    link: "/docs/general/product-features/session-replay/overview",
  },
  {
    title: "Session Replay",
    description: "Error Monitoring for frontend & backend.",
    thumbnail: <HiFilm className="h-[40px] w-[40px]" />,
    desktopImage: landingCarousel1,
    mobileImage: featureImg1,
    feature1: "Console and Network Recording",
    featureImage1: <HiTerminal className="h-[20px] w-[20px]" />,
    feature2: "Live Session Recording",
    featureImage2: <HiTerminal className="h-[20px] w-[20px]" />,
    feature3: "Powerful Privacy Controls",
    featureImage3: <HiTerminal className="h-[20px] w-[20px]" />,
    link: "/docs/general/product-features/session-replay/overview",
  },
  {
    title: "Session Replay",
    description: "Error Monitoring for frontend & backend.",
    thumbnail: <HiFilm className="h-[40px] w-[40px]" />,
    desktopImage: landingCarousel1,
    mobileImage: featureImg1,
    feature1: "Console and Network Recording",
    featureImage1: <HiTerminal className="h-[20px] w-[20px]" />,
    feature2: "Live Session Recording",
    featureImage2: <HiTerminal className="h-[20px] w-[20px]" />,
    feature3: "Powerful Privacy Controls",
    featureImage3: <HiTerminal className="h-[20px] w-[20px]" />,
    link: "/docs/general/product-features/session-replay/overview",
  },
  {
    title: "Session Replay",
    description: "Error Monitoring for frontend & backend.",
    thumbnail: <HiFilm className="h-[40px] w-[40px]" />,
    desktopImage: landingCarousel1,
    mobileImage: featureImg1,
    feature1: "Console and Network Recording",
    featureImage1: <HiTerminal className="h-[20px] w-[20px]" />,
    feature2: "Live Session Recording",
    featureImage2: <HiTerminal className="h-[20px] w-[20px]" />,
    feature3: "Powerful Privacy Controls",
    featureImage3: <HiTerminal className="h-[20px] w-[20px]" />,
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
            <DesktopCard key={index} feature={feature} index={index} />
          )}
        </div>
      </div>
    </div >
  )
};
