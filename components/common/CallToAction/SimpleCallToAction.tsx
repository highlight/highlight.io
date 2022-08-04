import React from 'react';
import classNames from 'classnames';

import styles from '../../Home/Home.module.scss';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { Typography } from '../Typography/Typography';

export const SimpleCallToAction = () => {
  return (
    <div
      className={classNames(
        styles.callToActionBackground,
        styles.simpleCallToActionBackground
      )}
    >
      <div className={classNames(styles.anchorTitle, styles.ctaContainer)}>
        <div className={styles.sectionSubtitle}>
          <Typography type="outline">Try Highlight Today</Typography>
        </div>
        <h3 className={styles.ctaTitle}>
          Get the <span className={styles.highlightedText}>visibility</span> you
          need
        </h3>
        <div
          className={classNames(
            styles.buttonContainer,
            styles.tryButtonContainer
          )}
        >
          <PrimaryButton
            href="https://app.highlight.run/?sign_up=1"
            style={{ color: 'black' }}
          >
            <Typography type="copy1" emphasis={true}>
              Get started for free
            </Typography>
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
