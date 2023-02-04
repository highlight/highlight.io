import React from 'react';
import styles from '../../Home/Home.module.scss';
import productStyles from '../../Products/Products.module.scss';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { AiFillGithub } from 'react-icons/ai';
import { FaDiscord } from 'react-icons/fa';
import { Typography } from '../Typography/Typography';
import classNames from 'classnames';

export const OSSCallToAction = () => {
  return (
    <div className={"flex justify-center mx-5 md:mx-[10vw] mt-32 mb-40"}>
      <div className={classNames(styles.ossCard, "w-full border-[1px] border-divider-on-dark rounded-3xl py-10")}>
        <h3 className="text-center">
          Join our <span className={styles.highlightedText}>Open-Source</span> Community.
        </h3>
        <div className="text-center px-16 mt-6">
          <Typography type="copy1" >
            Have a feature request? Or want to build the future of Highlight?<br />
            Check us out and join the fun!
          </Typography>
        </div>
        <div className="flex justify-center mt-16">
          <div className="flex flex-col lg:flex-row justify-center gap-3 lg:gap-4"
          >
            <PrimaryButton href="https://github.com/highlight/">
              <div className="flex items-center gap-3">
                <AiFillGithub className="w-5 h-5 mb-[2px]" />
                <Typography type="copy2" emphasis={true}>
                  Github Repo
                </Typography>
              </div>
            </PrimaryButton>
            <PrimaryButton href="https://discord.gg/yxaXEAqgwN" className={styles.hollowButton}>
              <div className="flex items-center gap-3">
                <FaDiscord className="w-5 h-5" />
                <Typography type="copy2" emphasis={true}>
                  Discord Community
                </Typography>
              </div>
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};
