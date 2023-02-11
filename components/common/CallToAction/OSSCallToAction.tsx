import React from 'react';
import styles from '../../Home/Home.module.scss';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { AiFillGithub } from 'react-icons/ai';
import { FaDiscord } from 'react-icons/fa';
import { Typography } from '../Typography/Typography';
import classNames from 'classnames';


export const OSSCallToAction = () => {

  return (
    <div className={"flex justify-center mx-5 md:mx-[10vw] my-10 md:my-40"}>
      <div className={classNames(styles.ossCard, "w-full max-w-[1250px] border-[1px] border-divider-on-dark rounded-3xl py-10 px-2")}>
        <h3 className="text-center leading-normal">
          Join our <span className={styles.highlightedText}>open source</span> community.
        </h3>
        <div className="text-center px-2 md:px-16 mt-6">
          <Typography type="copy1" className="leading-relaxed">
            Have a feature request? Or want to build the future of Highlight?<br />
            Check us out and join the fun!
          </Typography>
        </div>
        <div className="flex justify-center mt-16">
          <div className="flex flex-col lg:flex-row justify-center gap-4 w-full px-5 sm:w-auto"
          >
            <PrimaryButton href="https://github.com/highlight/highlight">
              <div className="flex justify-center items-center gap-3">
                <AiFillGithub className="w-6 h-6 mb-[1px]" />
                <Typography type="copy2" emphasis={true}>
                  Github
                </Typography>
              </div>
            </PrimaryButton>
            <PrimaryButton href="https://discord.gg/yxaXEAqgwN" className={styles.hollowButton}>
              <div className="flex items-center gap-3">
                <FaDiscord className="w-6 h-6" />
                <Typography type="copy2" emphasis={true} className="hidden sm:flex">
                  Discord Community
                </Typography>
                <Typography type="copy2" emphasis={true} className="sm:hidden">
                  Discord
                </Typography>
              </div>
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};
