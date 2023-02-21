import styles from '../Home.module.scss'
import classNames from 'classnames'
import { Typography } from '../../common/Typography/Typography'
import { useEffect, useState } from 'react'
import { StaticImageData } from 'next/image'
import sessionReplay from '../../../public/images/session-replay.png'
import errorMonitoring from '../../../public/images/error-monitoring.png'
import fullstackLogging from '../../../public/images/fullstack-logging.png'
import selfHosting from '../../../public/images/docker.png'
import openSource from '../../../public/images/open-source.png'
import tempCarouselImage from '../../../public/images/tempCarouselImage.png'
import useEmblaCarousel from 'embla-carousel-react'
import {
  HiTerminal,
  HiFilm,
  HiLightningBolt,
  HiCloudDownload,
  HiUserGroup,
  HiViewBoards,
  HiDocumentSearch,
  HiPhoneOutgoing,
  HiDatabase,
  HiBell,
  HiCode,
  HiDesktopComputer,
  HiPresentationChartLine,
} from 'react-icons/hi'
import { DesktopCard } from './DesktopCard'
import { HiChevronDown } from 'react-icons/hi'
import { PrimaryButton } from '../../common/Buttons/PrimaryButton'
import { AiFillGithub } from 'react-icons/ai'
import { ExclamationCircleFilled } from '@ant-design/icons'

export type Feature = {
  title: string
  description: string
  thumbnail: JSX.Element
  desktopImage: StaticImageData
  mobileImage: StaticImageData
  right?: boolean
  code?: string[]
  feature1?: string
  featureImage1?: JSX.Element
  feature2?: string
  featureImage2?: JSX.Element
  feature3?: string
  featureImage3?: JSX.Element
  link: string
}

//feature images need classname "h-[20px] w-[20px]"
//thumbnail needs classname "h-[40px] w-[40px]"
const features: Feature[] = [
  {
    title: 'Session Replay',
    description:
      'Get to the real reasons that bugs are happening your web application.',
    thumbnail: <HiFilm className="h-[35px] w-[35px]" />,
    desktopImage: sessionReplay,
    mobileImage: tempCarouselImage,
    right: true,
    feature1: 'Console and Network Recording',
    featureImage1: <HiTerminal className="h-[20px] w-[20px]" />,
    feature2: 'Comprehensive Session Search',
    featureImage2: <HiDocumentSearch className="h-[20px] w-[20px]" />,
    feature3: 'Powerful Privacy Controls',
    featureImage3: <HiPhoneOutgoing className="h-[20px] w-[20px]" />,
    link: '/docs/general/product-features/session-replay/overview',
  },
  {
    title: 'Error Monitoring',
    description:
      'Understand the errors and exceptions happening in your web application.',
    thumbnail: <HiTerminal className="h-[35px] w-[35px]" />,
    desktopImage: errorMonitoring,
    mobileImage: tempCarouselImage,
    right: true,
    feature1: 'Custom Error Grouping',
    featureImage1: <HiUserGroup className="h-[20px] w-[20px]" />,
    feature2: 'Customizable Alerting Rules',
    featureImage2: <HiViewBoards className="h-[20px] w-[20px]" />,
    feature3: 'Powered by Open Telemetry',
    featureImage3: <ExclamationCircleFilled className="h-[20px] w-[20px]" />,
    link: '/docs/general/product-features/error-monitoring/overview',
  },
  {
    title: 'Fullstack',
    description: 'Drill down on all the logs emitted throughout your stack.',
    thumbnail: <HiLightningBolt className="h-[35px] w-[35px]" />,
    desktopImage: fullstackLogging,
    mobileImage: tempCarouselImage,
    right: true,
    feature1: 'Customizable Log Alerts',
    featureImage1: <HiBell className="h-[20px] w-[20px]" />,
    feature2: 'Widespread SDK Support',
    featureImage2: <HiCode className="h-[20px] w-[20px]" />,
    feature3: 'Powered by Clickhouse',
    featureImage3: <HiDatabase className="h-[20px] w-[20px]" />,
    link: '/docs/general/product-features/session-replay/overview',
  },
  {
    title: 'Self-Hosting',
    description:
      'Interested in self-hosting highlight? Spin up highlight.io in docker with just a few commands.',
    thumbnail: <HiCloudDownload className="h-[35px] w-[35px]" />,
    desktopImage: selfHosting,
    mobileImage: tempCarouselImage,
    right: true,
    code: [
      `git clone --recurse-submodules https://github.com/highlight/highlight;`,
      `cd docker;`,
      `docker compose up -d --build;`,
    ],
    link: '/docs/general/company/open-source/self-host-hobby',
  },
  {
    title: 'Open Source',
    description:
      'highlight.io is an open source tool for debugging your web application.',
    thumbnail: <AiFillGithub className="h-[35px] w-[35px]" />,
    desktopImage: openSource,
    mobileImage: tempCarouselImage,
    right: true,
    feature1: 'Join the Community',
    featureImage1: <HiPresentationChartLine className="h-[20px] w-[20px]" />,
    feature2: 'Find us on GitHub',
    featureImage2: <HiDesktopComputer className="h-[20px] w-[20px]" />,
    feature3: 'Self host highlight.io',
    featureImage3: <ExclamationCircleFilled className="h-[20px] w-[20px]" />,
    link: 'https://github.com/highlight/highlight',
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
    ; (document.getElementById('dropdown') as HTMLSelectElement).value =
      selected.toString()
  }, [emblaApi, selected])

  const handleDropdown = () => {
    let dropdownValue = parseInt(
      (document.getElementById('dropdown') as HTMLSelectElement).value,
    )
    setSelected(dropdownValue)
  }

  return (
    <div className="flex flex-col overflow-x-hidden lg:rounded-lg max-w-[100vw] xl:max-w-[1000px] lg:rounded-tr-lg lg:rounded-tl-lg">
      <div className={`hidden md:grid grid-cols-5`}>
        {features.map((feature, index) => (
          <div
            key={index}
            onClick={() => setSelected(index)}
            className={classNames(
              styles.carouselButton,
              'group',
              index == 0 ? 'lg:rounded-tl-lg' : '',
              index == features.length - 1 ? 'lg:rounded-tr-lg' : '',
            )}
          >
            <div
              className={`${selected == index
                ? 'bg-divider-on-dark'
                : 'group-hover:bg-divider-on-dark group-hover:bg-opacity-75'
                } h-full flex justify-center gap-1 px-3 py-2 rounded-lg transition-all`}
            >
              <div className="flex flex-col gap-1">
                <div className="flex justify-center text-color-copy-on-dark">
                  {feature.thumbnail}
                </div>
                <Typography
                  type="copy3"
                  className="text-center"
                  emphasis={true}
                >
                  {feature.title}
                </Typography>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative flex md:hidden justify-center mx-5 mb-8 rounded-lg">
        <PrimaryButton
          className={classNames(
            styles.whiteButton,
            'w-full border-copy-on-dark py-0 px-0 h-[54px]',
          )}
        >
          <Typography
            type="copy2"
            className="bg-color-primary-500 rounded-lg w-full"
            emphasis={true}
          >
            <select
              onChange={() => handleDropdown()}
              id="dropdown"
              className="w-full px-4 bg-color-primary-500 h-full text-center rounded-lg appearance-none"
            >
              {features.map((feature, index) => (
                <option key={index} value={index}>
                  {feature.title}
                </option>
              ))}
            </select>
          </Typography>
        </PrimaryButton>
        <HiChevronDown className="absolute text-color-copy-on-dark h-[20px] w-[20px] top-4 right-5" />
      </div>
      <div className="w-screen lg:w-full" ref={emblaRef}>
        <div className="flex scrollbar-hide lg:gap-4">
          {features.map((feature, index) => (
            <DesktopCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
