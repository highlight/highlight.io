import styles from '../Home.module.scss';
import classNames from 'classnames';
import { Typography } from '../../../components/common/Typography/Typography';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { PrimaryButton } from '../../common/Buttons/PrimaryButton';
import featureImg1 from '../../../public/images/featureCarousel1.png';
import landingCarousel1 from '../../../public/images/landingCarousel1.png';
import useEmblaCarousel from 'embla-carousel-react'
import { HiTerminal } from 'react-icons/hi';


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
    <div className="flex flex-col overflow-x-hidden rounded-lg max-w-[1100px]">
      <div className="grid grid-cols-4">
        <div onClick={() => setSelected(0)} className={classNames(styles.carouselButton, "group rounded-tl-lg")}>
          <div className={`${selected == 0 ? "bg-divider-on-dark" : "group-hover:bg-divider-on-dark group-hover:bg-opacity-75"} flex flex-col gap-1 px-3 py-2 rounded-lg`}>
            <Typography type="copy3" emphasis={true}>Session Replay</Typography>
            <Typography type="copy4">Error Monitoring for frontend & backend.</Typography>
          </div>
        </div>
        <div onClick={() => setSelected(1)} className={classNames(styles.carouselButton, "group")}>
          <div className={`${selected == 1 ? "bg-divider-on-dark" : "group-hover:bg-divider-on-dark group-hover:bg-opacity-75"} flex flex-col gap-1 px-3 py-2 rounded-lg`}>
            <Typography type="copy3" emphasis={true}>Fullstack Error Monitoring</Typography>
            <Typography type="copy4">Error Monitoring for frontend & backend.</Typography>
          </div>
        </div>
        <div onClick={() => setSelected(2)} className={classNames(styles.carouselButton, "group")}>
          <div className={`${selected == 2 ? "bg-divider-on-dark" : "group-hover:bg-divider-on-dark group-hover:bg-opacity-75"} flex flex-col gap-1 px-3 py-2 rounded-lg`}>
            <Typography type="copy3" emphasis={true}>Logging & Log Alerts</Typography>
            <Typography type="copy4">Error Monitoring for frontend & backend.</Typography>
          </div>
        </div>
        <div onClick={() => setSelected(3)} className={classNames(styles.carouselButton, "group rounded-tr-lg")}>
          <div className={`${selected == 3 ? "bg-divider-on-dark" : "group-hover:bg-divider-on-dark group-hover:bg-opacity-75"} flex flex-col gap-1 px-3 py-2 rounded-lg`}>
            <Typography type="copy3" emphasis={true}>Fullstack Error Monitoring</Typography>
            <Typography type="copy4">Error Monitoring for frontend & backend.</Typography>
          </div>
        </div>
      </div>
      <div className="w-full max-w-[1100px]" ref={emblaRef}>
        <div className={classNames(styles.carouselContainer)}>

          <div className="relative flex justify-end px-16 w-full h-[575px] border-[1px] border-divider-on-dark rounded-bl-lg rounded-br-lg flex-shrink-0 snap-always snap-center">

            <div className="absolute bottom-0 left-0 rounded-lg">
              <Image className="object-contain w-auto h-[450px] rounded-lg" src={landingCarousel1} alt="Feature Spotlight" />
            </div>
            <div className="flex flex-col gap-4 justify-center text-left w-2/5">
              <h5>Session Replay</h5>
              <Typography type="copy3">Understand the real reason why bugs are happening in your web application.</Typography>
              <div className="flex flex-col gap-5 py-4 my-3 bg-color-divider-on-dark rounded-lg px-4">
                <div className="flex items-center gap-2">
                  <HiTerminal className="w-[20px] h-[20px]" />
                  <Typography type="copy3" className="text-color-copy-on-dark" emphasis>Customizable Log Alerts and Monitors</Typography>
                </div>
                <div className="flex items-center gap-2">
                  <HiTerminal className="w-[20px] h-[20px]" />
                  <Typography type="copy3" className="text-color-copy-on-dark" emphasis>Live Session Recording</Typography>
                </div>
                <div className="flex items-center gap-2">
                  <HiTerminal className="w-[20px] h-[20px]" />
                  <Typography type="copy3" className="text-color-copy-on-dark" emphasis>Powerful Privacy Controls</Typography>
                </div>
              </div>
              <div className="flex justify-start">
                <PrimaryButton href="https://app.highlight.io/?sign_up=1">
                  <Typography type="copy2" emphasis={true}>Learn More</Typography>
                </PrimaryButton>
              </div>
            </div>
          </div>

          <div className="relative flex justify-between px-16 w-full h-[575px] border-[1px] border-divider-on-dark rounded-bl-lg rounded-br-lg flex-shrink-0 snap-always snap-center">
            <div className="flex flex-col gap-4 justify-center text-left w-2/5">
              <h5>Fullstack Logging</h5>
              <Typography type="copy3">Understand and drill down on all the logs being written throughout your stack.</Typography>
              <div className="flex flex-col gap-5 py-4 my-3 bg-color-divider-on-dark rounded-lg px-4">
                <div className="flex items-center gap-2">
                  <HiTerminal className="w-[20px] h-[20px]" />
                  <Typography type="copy3" className="text-color-copy-on-dark" emphasis>Customizable Log Alerts and Monitors</Typography>
                </div>
                <div className="flex items-center gap-2">
                  <HiTerminal className="w-[20px] h-[20px]" />
                  <Typography type="copy3" className="text-color-copy-on-dark" emphasis>Live Session Recording</Typography>
                </div>
                <div className="flex items-center gap-2">
                  <HiTerminal className="w-[20px] h-[20px]" />
                  <Typography type="copy3" className="text-color-copy-on-dark" emphasis>Powerful Privacy Controls</Typography>
                </div>
              </div>
              <div className="flex justify-start">
                <PrimaryButton href="https://app.highlight.io/?sign_up=1">
                  <Typography type="copy2" emphasis={true}>Learn More</Typography>
                </PrimaryButton>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 rounded-lg">
              <Image className="object-contain w-auto h-[500px] rounded-lg" src={featureImg1} alt="Feature Spotlight" />
            </div>
          </div>

          <div className="relative flex justify-between px-16 w-full h-[575px] border-[1px] border-divider-on-dark rounded-bl-lg rounded-br-lg flex-shrink-0 snap-always snap-center">
            <div className="flex flex-col gap-4 justify-center text-left w-2/5">
              <h5>Error Monitoring</h5>
              <Typography type="copy3">Understand the errors and exceptions happening in your web application.</Typography>
              <div className="flex flex-col gap-5 py-4 my-3 bg-color-divider-on-dark rounded-lg px-4">
                <div className="flex items-center gap-2">
                  <HiTerminal className="w-[20px] h-[20px]" />
                  <Typography type="copy3" className="text-color-copy-on-dark" emphasis>Customizable Log Alerts and Monitors</Typography>
                </div>
                <div className="flex items-center gap-2">
                  <HiTerminal className="w-[20px] h-[20px]" />
                  <Typography type="copy3" className="text-color-copy-on-dark" emphasis>Live Session Recording</Typography>
                </div>
                <div className="flex items-center gap-2">
                  <HiTerminal className="w-[20px] h-[20px]" />
                  <Typography type="copy3" className="text-color-copy-on-dark" emphasis>Powerful Privacy Controls</Typography>
                </div>
              </div>
              <div className="flex justify-start">
                <PrimaryButton href="https://app.highlight.io/?sign_up=1">
                  <Typography type="copy2" emphasis={true}>Learn More</Typography>
                </PrimaryButton>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 rounded-lg">
              <Image className="object-contain w-auto h-[500px] rounded-lg" src={featureImg1} alt="Feature Spotlight" />
            </div>
          </div>

          <div className="relative flex justify-between px-16 w-full h-[575px] border-[1px] border-divider-on-dark rounded-bl-lg rounded-br-lg flex-shrink-0 snap-always snap-center">
            <div className="flex flex-col gap-4 justify-center text-left w-2/5">
              <h5>Error Monitoring</h5>
              <Typography type="copy3">Understand the errors and exceptions happening in your web application.</Typography>
              <div className="flex flex-col gap-5 py-4 my-3 bg-color-divider-on-dark rounded-lg px-4">
                <div className="flex items-center gap-2">
                  <HiTerminal className="w-[20px] h-[20px]" />
                  <Typography type="copy3" className="text-color-copy-on-dark" emphasis>Customizable Log Alerts and Monitors</Typography>
                </div>
                <div className="flex items-center gap-2">
                  <HiTerminal className="w-[20px] h-[20px]" />
                  <Typography type="copy3" className="text-color-copy-on-dark" emphasis>Live Session Recording</Typography>
                </div>
                <div className="flex items-center gap-2">
                  <HiTerminal className="w-[20px] h-[20px]" />
                  <Typography type="copy3" className="text-color-copy-on-dark" emphasis>Powerful Privacy Controls</Typography>
                </div>
              </div>
              <div className="flex justify-start">
                <PrimaryButton href="https://app.highlight.io/?sign_up=1">
                  <Typography type="copy2" emphasis={true}>Learn More</Typography>
                </PrimaryButton>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 rounded-lg">
              <Image className="object-contain w-auto h-[500px] rounded-lg" src={featureImg1} alt="Feature Spotlight" />
            </div>
          </div>


        </div>
      </div>
    </div >
  )
};
