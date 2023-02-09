import styles from '../Home.module.scss';
import { Typography } from '../../../components/common/Typography/Typography';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'rc-image';
import FooterLeftImage from '../../../public/images/safety-security-section.gif';
import featureImg from '../../../public/images/featureImg1.svg';


export const FeatureCarousel = () => {
  const [selected, setSelected] = useState(3)

  return (
    <div className="">
      <div className="flex gap-4 w-[75vw]">
        <div className={`${selected == 0 ? "bg-divider-on-dark" : "bg-primary-200 border-[1px] border-divider-on-dark"} w-1/4 flex flex-col flex-grow-0 text-left gap-1 p-5 rounded-lg`}>
          <Typography type="copy3" emphasis={true}>Session Replay</Typography>
          <Typography type="copy4">See how your product is used, understand why people drop off</Typography>
        </div>
        <div className={`${selected == 1 ? "bg-divider-on-dark" : "bg-primary-200 border-[1px] border-divider-on-dark"} w-1/4 flex flex-col flex-grow-0 text-left gap-1  p-5 rounded-lg`}>
          <Typography type="copy3" emphasis={true}>Fullstack Error Monitoring</Typography>
          <Typography type="copy4">Error Monitoring for frontend & backend.</Typography>
        </div>
        <div className={`${selected == 2 ? "bg-divider-on-dark" : "bg-primary-200 border-[1px] border-divider-on-dark"} w-1/4 flex flex-col flex-grow-0 text-left gap-1  p-5 rounded-lg`}>
          <Typography type="copy3" emphasis={true}>Logging & Log Alerts</Typography>
          <Typography type="copy4">Error Monitoring for frontend & backend.</Typography>
        </div>
        <div className={`${selected == 3 ? "bg-divider-on-dark" : "bg-primary-200 border-[1px] border-divider-on-dark"} w-1/4 flex flex-col flex-grow-0 text-left gap-1  p-5 rounded-lg`}>
          <Typography type="copy3" emphasis={true}>Fullstack Error Monitoring</Typography>
          <Typography type="copy4">Error Monitoring for frontend & backend.</Typography>
        </div>
      </div>
      <div className="flex overflow-x-auto mt-4 gap-4 w-[75vw] snap-x snap-mandatory scrollbar-hide">
        <div className="flex justify-between pl-16 w-[75vw] h-[575px] border-[1px] border-divider-on-dark rounded-lg flex-shrink-0 snap-always snap-center">
          <div className="flex flex-col gap-3 justify-center text-left w-2/5">
            <h5>Error Monitoring</h5>
            <Typography type="copy3">Understand the errors and exceptions happening in your  web application.</Typography>
            <div className="flex flex-col gap-3 my-3">
              <div className="px-6 py-3 border-2 border-divider-on-dark rounded-lg">
                <Typography type="copy3" emphasis>Error Monitoring for frontend & backend.</Typography>
              </div>
              <div className="px-6 py-3 border-2 border-divider-on-dark rounded-lg">
                <Typography type="copy3" emphasis>Error Monitoring for frontend & backend.</Typography>
              </div>
              <div className="px-6 py-3 border-2 border-divider-on-dark rounded-lg">
                <Typography type="copy3" emphasis>Error Monitoring for frontend & backend.</Typography>
              </div>
            </div>
            <Typography type="copy3" onDark>
              <Link href="/customers">
                Learn More→
              </Link>
            </Typography>
            <div className={styles.footerImageLeft}>
              hi
            </div>
          </div>
          <div className="">
            <Image src={featureImg} alt="Feature Spotlight" />
          </div>
        </div>
        <div className="flex justify-between pl-16 w-[75vw] h-[575px] border-[1px] border-divider-on-dark rounded-lg flex-shrink-0 snap-always snap-center">
          <div className="flex flex-col gap-3 justify-center text-left w-2/5">
            <h5>Error Monitoring</h5>
            <Typography type="copy3">Understand the errors and exceptions happening in your  web application.</Typography>
            <div className="flex flex-col gap-3 my-3">
              <div className="px-6 py-3 border-2 border-divider-on-dark rounded-lg">
                <Typography type="copy3" emphasis>Error Monitoring for frontend & backend.</Typography>
              </div>
              <div className="px-6 py-3 border-2 border-divider-on-dark rounded-lg">
                <Typography type="copy3" emphasis>Error Monitoring for frontend & backend.</Typography>
              </div>
              <div className="px-6 py-3 border-2 border-divider-on-dark rounded-lg">
                <Typography type="copy3" emphasis>Error Monitoring for frontend & backend.</Typography>
              </div>
            </div>
            <Typography type="copy3" onDark>
              <Link href="/customers">
                Learn More→
              </Link>
            </Typography>
            <div className={styles.footerImageLeft}>
              hi
            </div>
          </div>
          <div className="">
            <Image src={featureImg} alt="Feature Spotlight" />
          </div>
        </div>
        <div className="flex justify-between pl-16 w-[75vw] h-[575px] border-[1px] border-divider-on-dark rounded-lg flex-shrink-0 snap-always snap-center">
          <div className="flex flex-col gap-3 justify-center text-left w-2/5">
            <h5>Error Monitoring</h5>
            <Typography type="copy3">Understand the errors and exceptions happening in your  web application.</Typography>
            <div className="flex flex-col gap-3 my-3">
              <div className="px-6 py-3 border-2 border-divider-on-dark rounded-lg">
                <Typography type="copy3" emphasis>Error Monitoring for frontend & backend.</Typography>
              </div>
              <div className="px-6 py-3 border-2 border-divider-on-dark rounded-lg">
                <Typography type="copy3" emphasis>Error Monitoring for frontend & backend.</Typography>
              </div>
              <div className="px-6 py-3 border-2 border-divider-on-dark rounded-lg">
                <Typography type="copy3" emphasis>Error Monitoring for frontend & backend.</Typography>
              </div>
            </div>
            <Typography type="copy3" onDark>
              <Link href="/customers">
                Learn More→
              </Link>
            </Typography>
            <div className={styles.footerImageLeft}>
              hi
            </div>
          </div>
          <div className="">
            <Image src={featureImg} alt="Feature Spotlight" />
          </div>
        </div>
        <div className="flex justify-between pl-16 w-[75vw] h-[575px] border-[1px] border-divider-on-dark rounded-lg flex-shrink-0 snap-always snap-center">
          <div className="flex flex-col gap-3 justify-center text-left w-2/5">
            <h5>Error Monitoring</h5>
            <Typography type="copy3">Understand the errors and exceptions happening in your  web application.</Typography>
            <div className="flex flex-col gap-3 my-3">
              <div className="px-6 py-3 border-2 border-divider-on-dark rounded-lg">
                <Typography type="copy3" emphasis>Error Monitoring for frontend & backend.</Typography>
              </div>
              <div className="px-6 py-3 border-2 border-divider-on-dark rounded-lg">
                <Typography type="copy3" emphasis>Error Monitoring for frontend & backend.</Typography>
              </div>
              <div className="px-6 py-3 border-2 border-divider-on-dark rounded-lg">
                <Typography type="copy3" emphasis>Error Monitoring for frontend & backend.</Typography>
              </div>
            </div>
            <Typography type="copy3" onDark>
              <Link href="/customers">
                Learn More→
              </Link>
            </Typography>
            <div className={styles.footerImageLeft}>
              hi
            </div>
          </div>
          <div className="">
            <Image src={featureImg} alt="Feature Spotlight" />
          </div>
        </div>
      </div>
    </div>
  );
};
