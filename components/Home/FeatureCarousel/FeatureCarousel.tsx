import styles from '../Home.module.scss';
import classNames from 'classnames';
import { Typography } from '../../../components/common/Typography/Typography';
import { useEffect, useState } from 'react';
import { StaticImageData } from 'next/image';
import featureImg1 from '../../../public/images/featureCarousel1.png';
import landingCarousel1 from '../../../public/images/landingCarousel1.png';
import tempCarouselImage from '../../../public/images/tempCarouselImage.png';
import useEmblaCarousel from 'embla-carousel-react'
import { HiTerminal, HiFilm, HiLightningBolt, HiCloudDownload } from 'react-icons/hi';
import { DesktopCard } from './DesktopCard';
import { HiChevronDown } from 'react-icons/hi';
import { PrimaryButton } from '../../common/Buttons/PrimaryButton';
import { AiFillGithub } from 'react-icons/ai';

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

//feature images need classname "h-[20px] w-[20px]"
//thumbnail needs classname "h-[40px] w-[40px]"
const features: Feature[] = [
  {
    title: "Error Monitoring",
    description: "Error Monitoring for frontend & backend.",
    thumbnail: <HiLightningBolt className="h-[35px] w-[35px]" />,
    desktopImage: landingCarousel1,
    mobileImage: tempCarouselImage,
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
    thumbnail: <HiFilm className="h-[35px] w-[35px]" />,
    desktopImage: landingCarousel1,
    mobileImage: tempCarouselImage,
    feature1: "Console and Network Recording",
    featureImage1: <HiTerminal className="h-[20px] w-[20px]" />,
    feature2: "Live Session Recording",
    featureImage2: <HiTerminal className="h-[20px] w-[20px]" />,
    feature3: "Powerful Privacy Controls",
    featureImage3: <HiTerminal className="h-[20px] w-[20px]" />,
    link: "/docs/general/product-features/session-replay/overview",
  },
  {
    title: "Logging",
    description: "Error Monitoring for frontend & backend.",
    thumbnail: <HiLightningBolt className="h-[35px] w-[35px]" />,
    desktopImage: landingCarousel1,
    mobileImage: tempCarouselImage,
    feature1: "Console and Network Recording",
    featureImage1: <HiTerminal className="h-[20px] w-[20px]" />,
    feature2: "Live Session Recording",
    featureImage2: <HiTerminal className="h-[20px] w-[20px]" />,
    feature3: "Powerful Privacy Controls",
    featureImage3: <HiTerminal className="h-[20px] w-[20px]" />,
    link: "/docs/general/product-features/session-replay/overview",
  },
  {
    title: "Selfhost",
    description: "Error Monitoring for frontend & backend.",
    thumbnail: <HiCloudDownload className="h-[35px] w-[35px]" />,
    desktopImage: landingCarousel1,
    mobileImage: tempCarouselImage,
    feature1: "Console and Network Recording",
    featureImage1: <HiTerminal className="h-[20px] w-[20px]" />,
    feature2: "Live Session Recording",
    featureImage2: <HiTerminal className="h-[20px] w-[20px]" />,
    feature3: "Powerful Privacy Controls",
    featureImage3: <HiTerminal className="h-[20px] w-[20px]" />,
    link: "/docs/general/product-features/session-replay/overview",
  },
  {
    title: "Open Source",
    description: "Error Monitoring for frontend & backend.",
    thumbnail: <AiFillGithub className="h-[35px] w-[35px]" />,
    desktopImage: landingCarousel1,
    mobileImage: tempCarouselImage,
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
    (document.getElementById("dropdown") as HTMLSelectElement).value = selected.toString()
  }, [emblaApi, selected])

  const handleDropdown = () => {
    let dropdownValue = parseInt((document.getElementById("dropdown") as HTMLSelectElement).value)
    setSelected(dropdownValue)
  }

  return (
    <div className="flex flex-col overflow-x-hidden lg:rounded-lg max-w-[100vw] xl:max-w-[1100px]">
      <div className={`hidden md:grid grid-cols-5`}>
        {features.map((feature, index) =>
          <div key={index} onClick={() => setSelected(index)} className={classNames(styles.carouselButton, "group xlg:rounded-tl-lg")}>
            <div className={`${selected == index ? "bg-divider-on-dark" : "group-hover:bg-divider-on-dark group-hover:bg-opacity-75"} h-full flex justify-center gap-1 px-3 py-2 rounded-lg transition-all`}>
              <div className="flex flex-col gap-1">
                <div className="flex justify-center text-color-copy-on-dark">
                  {feature.thumbnail}
                </div>
                <Typography type="copy3" className="text-center" emphasis={true}>{feature.title}</Typography>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="relative flex md:hidden justify-center mx-5 mb-8 rounded-lg">
        <PrimaryButton className={classNames(styles.whiteButton, "w-full border-copy-on-dark py-0 px-0 h-[54px]")}>
          <Typography type="copy2" className="relative bg-color-primary-500 rounded-lg w-full" emphasis={true}>
            <select onChange={() => handleDropdown()} id="dropdown" className="absolute -translate-x-1/2 w-full bg-color-primary-500 h-full text-center rounded-lg appearance-none">
              {features.map((feature, index) =>
                <option key={index} value={index}>
                  {feature.title}
                </option>
              )}
            </select>
          </Typography>
        </PrimaryButton>
        <HiChevronDown className="absolute text-color-copy-on-dark h-[20px] w-[20px] top-4 right-5" />
      </div>
      <div className="w-screen lg:w-full" ref={emblaRef}>
        <div className="flex scrollbar-hide lg:gap-4">
          {features.map((feature, index) =>
            <DesktopCard key={index} feature={feature} index={index} />
          )}
        </div>
      </div>
    </div >
  )
};
