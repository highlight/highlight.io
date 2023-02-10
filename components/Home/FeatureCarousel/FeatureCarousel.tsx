import styles from '../Home.module.scss';
import { Typography } from '../../../components/common/Typography/Typography';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FooterLeftImage from '../../../public/images/safety-security-section.gif';
import featureImg1 from '../../../public/images/featureCarousel1.png';


export const FeatureCarousel = () => {
  const [selected, setSelected] = useState(3)

  return (
    <div className="hidden xl:flex flex-col max-w-[1250px]">
      <div className="flex gap-4">
        <div onClick={() => setSelected(0)} className={`${selected == 0 ? "bg-divider-on-dark  border-[1px] border-divider-on-dark" : "bg-primary-200 border-[1px] border-divider-on-dark hover:border-color-selected-light"} w-1/4 flex flex-col flex-grow-0 text-left gap-1 p-5 rounded-lg cursor-pointer transition-all`}>
          <Typography type="copy3" emphasis={true}>Session Replay</Typography>
          <Typography type="copy4">See how your product is used, understand why people drop off</Typography>
        </div>
        <div onClick={() => setSelected(1)} className={`${selected == 1 ? "bg-divider-on-dark  border-[1px] border-divider-on-dark" : "bg-primary-200 border-[1px] border-divider-on-dark hover:border-color-selected-light"} w-1/4 flex flex-col flex-grow-0 text-left gap-1 p-5 rounded-lg cursor-pointer transition-all`}>
          <Typography type="copy3" emphasis={true}>Fullstack Error Monitoring</Typography>
          <Typography type="copy4">Error Monitoring for frontend & backend.</Typography>
        </div>
        <div onClick={() => setSelected(2)} className={`${selected == 2 ? "bg-divider-on-dark  border-[1px] border-divider-on-dark" : "bg-primary-200 border-[1px] border-divider-on-dark hover:border-color-selected-light"} w-1/4 flex flex-col flex-grow-0 text-left gap-1 p-5 rounded-lg cursor-pointer transition-all`}>
          <Typography type="copy3" emphasis={true}>Logging & Log Alerts</Typography>
          <Typography type="copy4">Error Monitoring for frontend & backend.</Typography>
        </div>
        <div onClick={() => setSelected(3)} className={`${selected == 3 ? "bg-divider-on-dark  border-[1px] border-divider-on-dark" : "bg-primary-200 border-[1px] border-divider-on-dark hover:border-color-selected-light"} w-1/4 flex flex-col flex-grow-0 text-left gap-1 p-5 rounded-lg cursor-pointer transition-all`}>
          <Typography type="copy3" emphasis={true}>Fullstack Error Monitoring</Typography>
          <Typography type="copy4">Error Monitoring for frontend & backend.</Typography>
        </div>
      </div>
      <div className="flex overflow-x-auto mt-4 gap-4 snap-x snap-mandatory scrollbar-hide">
        <div className="relative flex justify-between pl-16 w-full h-[575px] border-[1px] border-divider-on-dark rounded-lg flex-shrink-0 snap-always snap-center">
          <div className="flex flex-col gap-3 justify-center text-left w-2/5">
            <h5>Error Monitoring</h5>
            <Typography type="copy3">Understand the errors and exceptions happening in your  web application.</Typography>
            <div className="flex flex-col gap-4 py-4 my-3 bg-color-divider-on-dark rounded-lg px-8">
              <div className="">
                <Typography type="copy3" emphasis>Console and Network Recording</Typography>
              </div>
              <div className="">
                <Typography type="copy3" emphasis>Live Session Recording</Typography>
              </div>
              <div className="">
                <Typography type="copy3" emphasis>Powerful Privacy Controls</Typography>
              </div>
            </div>
            <Typography type="copy3" onDark>
              <Link href="/customers">
                Learn More→
              </Link>
            </Typography>
          </div>
          <div className="absolute bottom-0 right-0 ">
            <Image className="object-contain w-auto h-[500px]" src={featureImg1} alt="Feature Spotlight" />
          </div>
        </div>
      </div>
    </div>
  );
};
