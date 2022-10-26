import React from 'react';
import classNames from 'classnames';

import styles from '../../Home/Home.module.scss';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { Typography } from '../Typography/Typography';
import FooterLeftImage from '../../../public/images/safety-security-section.gif';
import FooterRightImage from '../../../public/images/hero-bug-right.gif';
import Image from "next/legacy/image";

export const FooterCallToAction = () => {
  return (
    <div className={styles.callToActionBackground}>
      <div className={classNames(styles.anchorTitle, styles.ctaContainer)}>
        <div className={styles.footerImageRight}>
          <Image src={FooterRightImage} alt="" />
        </div>
        <div className={styles.sectionSubtitle}>
          <Typography type="outline">Try Highlight Today</Typography>
        </div>
        <h2 className={styles.ctaTitle}>
          Get the <span className={styles.highlightedText}>visibility</span> you
          need
        </h2>
        <div
          className={classNames(
            styles.buttonContainer,
            styles.tryButtonContainer
          )}
        >
          <PrimaryButton href="https://app.highlight.run/?sign_up=1">
            <Typography type="copy2" emphasis={true}>
              Get started for free
            </Typography>
          </PrimaryButton>
        </div>
        <div className={styles.footerImageLeft}>
          <Image src={FooterLeftImage} alt="" />
        </div>
      </div>
    </div>
  );
};
