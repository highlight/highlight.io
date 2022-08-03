import React from 'react';
import classNames from 'classnames';

import styles from '../../Home/Home.module.scss';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { Typography } from '../Typography/Typography';
import FooterLeftImage from '../../../public/images/footer-highlighter-left.png';
import FooterRightImage from '../../../public/images/footer-bug-right.png';
import Image from 'next/image';

export const CallToAction = () => {
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
          <PrimaryButton href="https://app.highlight.io/?sign_up=1">
            <Typography type="copy1" emphasis={true}>
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
